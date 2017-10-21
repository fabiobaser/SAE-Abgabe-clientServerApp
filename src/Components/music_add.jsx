import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Search, Container, Input, Image, Header, Label, Message, Grid } from "semantic-ui-react";

export class MusicAdd extends Component {
  constructor() {
    super();

    this.state = {
      errorTitle: false,
      errorArtist: false,
      errorDances: false
    };
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({
      isLoading: false,
      results: [],
      titleValue: "",
      artistValue: "",
      cover: "",
      activeDanceTags: {
        tango: false
      },
      dancesArray: [],
      success: false
    });

  handleResultSelect = (e, { result }) => {
    this.setState({ titleValue: result.title });
    this.setState({ artistValue: result.description });
    this.setState({ cover: result.image });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ titleValue: value, isLoading: true });

    let completionArray = [];
    let trackName = encodeURI(value);
    let url = "http://itunes.apple.com/search?term=" + trackName + "&country=DE&media=music&limit=5&entity=song&attribute=songTerm";
    axios.get(url).then(response => {
      response.data.results.forEach((item, index) => {
        completionArray.push({
          title: item.trackName,
          description: item.artistName,
          image: item.artworkUrl100,
          key: index
        });
      });

      this.setState({ results: completionArray, isLoading: false });
    });
  };

  handleArtistChange = e => {
    this.setState({ artistValue: e.target.value });
  };

  danceTagClick = e => {
    let localDancesArray = this.state.dancesArray;
    if (localDancesArray.indexOf(e.target.value) === -1) {
      localDancesArray.push(e.target.value);
    } else {
      localDancesArray.splice(localDancesArray.indexOf(e.target.value), 1);
    }
    //Set toggle behaviour
    let danceTags = this.state.activeDanceTags;
    danceTags[e.target.value] = !danceTags[e.target.value];
    this.setState({ activeDanceTags: danceTags });
  };

  handleSubmit = e => {
    e.preventDefault();

    let errorState = {
      title: false,
      artist: false,
      dances: false
    };

    if (this.state.titleValue === "") {
      this.setState({ errorTitle: true });
      errorState.title = true;
    } else {
      this.setState({ errorTitle: false });
      errorState.title = false;
    }

    if (this.state.artistValue === "") {
      this.setState({ errorArtist: true });
      errorState.artist = true;
    } else {
      this.setState({ errorArtist: false });
      errorState.artist = false;
    }

    if (this.state.dancesArray.length === 0) {
      this.setState({ errorDances: true });
      errorState.dances = true;
    } else {
      this.setState({ errorDances: false });
      errorState.dances = false;
    }

    let self = this;
    // eslint-disable-next-line
    const regex = /([~`!#$%^&*+_()—.—˛¬”£°„¡“¶¢≠¿“±‘–…’ﬁ˜·¯˙˚˛≥∞÷§=´\-\[\]\\';,/{}|\\":<>?])/gm;
    const subst = `\\$1`;

    if (!errorState.title && !errorState.artist && !errorState.dances) {
      axios
        .get("http://localhost:5000/music/add", {
          params: {
            title: this.state.titleValue.replace(regex, subst),
            artist: this.state.artistValue.replace(regex, subst),
            dances: JSON.stringify(this.state.dancesArray).replace(regex, subst)
          }
        })
        .then(function(response) {
          self.resetComponent();
          self.setState({ success: true });
          setTimeout(function() {
            self.setState({ success: false });
          }, 3000);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  };

  render() {
    const { isLoading, titleValue, artistValue, results, activeDanceTags, cover } = this.state;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={10} textAlign="center">
            <Form style={{ marginTop: "7em" }}>
              <Header as="h1">Musik für Tanzmusik-Datenbank</Header>

              <Image src={cover} size="small" centered style={{ marginTop: "4em", marginBottom: "4em" }} />

              {this.state.errorTitle && (
                <Label basic color="red" pointing="below">
                  Du musst hier schon etwas eintragen
                </Label>
              )}
              <br />

              <Form.Field style={{ width: "22em" }} className="ui input">
                <Search
                  style={{ width: "100%" }}
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  noResultsMessage="Oh-oh. Nichts gefunden"
                  value={titleValue}
                  icon={null}
                  placeholder="Titel"
                />
              </Form.Field>
              <br />
              {this.state.errorArtist && (
                <Label basic color="red" pointing="below">
                  Auch hier muss etwas hinein
                </Label>
              )}
              <br />
              <Form.Field
                style={{ width: "22em" }}
                as={Input}
                placeholder="Interpret"
                value={artistValue}
                onChange={this.handleArtistChange}
              />
              <br />
              <br />
              {this.state.errorDances && (
                <Label basic color="red" style={{ marginBottom: "2em" }}>
                  Wähle bitte mindestens einen Tanz aus
                </Label>
              )}
              <p>Und was kann man dazu tanzen?</p>

              <Container width={4}>
                <Button size="mini" toggle active={activeDanceTags.chachacha} value="chachacha" onClick={this.danceTagClick}>
                  ChaChaCha
                </Button>
                <Button size="mini" toggle active={activeDanceTags.samba} value="samba" onClick={this.danceTagClick}>
                  Samba
                </Button>
                <Button size="mini" toggle active={activeDanceTags.rumba} value="rumba" onClick={this.danceTagClick}>
                  Rumba
                </Button>
                <Button size="mini" toggle active={activeDanceTags.salsa} value="salsa" onClick={this.danceTagClick}>
                  Salsa
                </Button>
                <Button size="mini" toggle active={activeDanceTags.jive} value="jive" onClick={this.danceTagClick}>
                  Jive
                </Button>
              </Container>
              <br />
              <Container width={4}>
                <Button size="mini" toggle active={activeDanceTags.waltzer} value="waltzer" onClick={this.danceTagClick}>
                  Wiener Waltzer
                </Button>
                <Button size="mini" toggle active={activeDanceTags.langWaltzer} value="langWaltzer" onClick={this.danceTagClick}>
                  Langs. Waltzer
                </Button>
                <Button size="mini" toggle active={activeDanceTags.quickstep} value="quickstep" onClick={this.danceTagClick}>
                  Quickstep
                </Button>
                <Button size="mini" toggle active={activeDanceTags.tango} value="tango" onClick={this.danceTagClick}>
                  Tango
                </Button>
                <Button size="mini" toggle active={activeDanceTags.slowfox} value="slowfox" onClick={this.danceTagClick}>
                  Slowfox
                </Button>
                <Button size="mini" toggle active={activeDanceTags.discofox} value="discofox" onClick={this.danceTagClick}>
                  Discofox
                </Button>
                <Button size="mini" toggle active={activeDanceTags.foxtrott} value="foxtrott" onClick={this.danceTagClick}>
                  Foxtrott
                </Button>
              </Container>
              <br />
              <Button size="mini" toggle active={activeDanceTags.tangoArg} value="tangoArg" onClick={this.danceTagClick}>
                Tango Argentino
              </Button>
              <br />
              <Button color="green" onClick={this.handleSubmit} style={{ marginTop: "3em" }}>
                Abschicken
              </Button>
            </Form>
            {this.state.success && (
              <Message positive compact>
                Dein Song-Vorschlag wurde erfolgreich übermittelt. Danke :)
              </Message>
            )}
          </Grid.Column>
          <Grid.Column width={3} />
        </Grid.Row>
      </Grid>
    );
  }
}
