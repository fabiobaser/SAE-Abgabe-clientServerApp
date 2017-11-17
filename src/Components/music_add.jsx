import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Search, Container, Input, Image, Header, Label, Message, Grid } from "semantic-ui-react";
//Config
const config = require("../config");

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

  resetComponent = () => {
    let lateinObj = {};
    config.dances.latein.map(item => {
      lateinObj[item] = false;
      return null;
    });

    let standardObj = {};
    config.dances.standard.map(item => {
      standardObj[item] = false;
      return null;
    });

    let miscObj = {};
    config.dances.misc.map(item => {
      miscObj[item] = false;
      return null;
    });

    let dances = { latein: lateinObj, standard: standardObj, misc: miscObj };

    let tags = {};
    config.tags.map(tag => {
      tags[tag] = false;
      return null;
    });

    this.setState({
      isLoading: false,
      results: [],
      titleValue: "",
      artistValue: "",
      cover: "",
      activeDanceTags: [],
      dancesArray: [],
      tagsArray: [],
      dances: dances,
      tags: tags,
      success: false
    });
  };

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
            dances: JSON.stringify(this.state.dancesArray),
            tags: JSON.stringify(this.state.tagsArray),
            coverURL: this.state.cover
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

  lateinClick = e => {
    let localDancesArray = this.state.dancesArray;
    if (localDancesArray.indexOf(e.target.text) === -1) {
      localDancesArray.push(e.target.text);
    } else {
      localDancesArray.splice(localDancesArray.indexOf(e.target.text), 1);
    }

    //toggle
    let tmp = this.state.dances;
    console.log(tmp.latein[e.target.text]);
    tmp.latein[e.target.text] = !tmp.latein[e.target.text];
    this.setState({ dances: tmp });

    console.log(this.state.dancesArray);
  };

  standardClick = e => {
    let localDancesArray = this.state.dancesArray;
    if (localDancesArray.indexOf(e.target.text) === -1) {
      localDancesArray.push(e.target.text);
    } else {
      localDancesArray.splice(localDancesArray.indexOf(e.target.text), 1);
    }

    //toggle
    let tmp = this.state.dances;
    console.log(tmp.standard[e.target.text]);
    tmp.standard[e.target.text] = !tmp.standard[e.target.text];
    this.setState({ dances: tmp });

    console.log(this.state.dancesArray);
  };

  miscClick = e => {
    let localDancesArray = this.state.dancesArray;
    if (localDancesArray.indexOf(e.target.text) === -1) {
      localDancesArray.push(e.target.text);
    } else {
      localDancesArray.splice(localDancesArray.indexOf(e.target.text), 1);
    }

    //toggle
    let tmp = this.state.dances;
    console.log(tmp.misc[e.target.text]);
    tmp.misc[e.target.text] = !tmp.misc[e.target.text];
    this.setState({ dances: tmp });

    console.log(this.state.dancesArray);
  };

  tagClick = e => {
    let localTagsArray = this.state.tagsArray;
    if (localTagsArray.indexOf(e.target.text) === -1) {
      localTagsArray.push(e.target.text);
    } else {
      localTagsArray.splice(localTagsArray.indexOf(e.target.text), 1);
    }

    //toggle
    let tmp = this.state.tags;
    console.log(tmp[e.target.text]);
    tmp[e.target.text] = !tmp[e.target.text];
    this.setState({ tags: tmp });

    console.log(this.state.tags);
  };

  render() {
    const { isLoading, titleValue, artistValue, results, cover } = this.state;

    let latein = Object.keys(this.state.dances.latein).map(dance => {
      let labelState;
      if (this.state.dances.latein[dance]) {
        labelState = "green";
      } else {
        labelState = null;
      }
      return (
        <Label as="a" color={labelState} key={dance} onClick={this.lateinClick}>
          {dance}
        </Label>
      );
    });

    let standard = Object.keys(this.state.dances.standard).map(dance => {
      let labelState;
      if (this.state.dances.standard[dance]) {
        labelState = "blue";
      } else {
        labelState = null;
      }
      return (
        <Label as="a" color={labelState} key={dance} onClick={this.standardClick}>
          {dance}
        </Label>
      );
    });

    let misc = Object.keys(this.state.dances.misc).map(dance => {
      let labelState;
      if (this.state.dances.misc[dance]) {
        labelState = "orange";
      } else {
        labelState = null;
      }
      return (
        <Label as="a" color={labelState} key={dance} onClick={this.miscClick}>
          {dance}
        </Label>
      );
    });

    let tags = Object.keys(this.state.tags).map(tag => {
      let labelState;
      if (this.state.tags[tag]) {
        labelState = "pink";
      } else {
        labelState = null;
      }
      return (
        <Label tag as="a" color={labelState} key={tag} onClick={this.tagClick}>
          {tag}
        </Label>
      );
    });

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
                <Label.Group>{latein}</Label.Group>
              </Container>
              <br />
              <Container width={4}>
                <Label.Group>{standard}</Label.Group>
              </Container>
              <br />
              <Container width={4}>
                <Label.Group>{misc}</Label.Group>
              </Container>
              <br />

              <p>Etwas bessonderes?</p>
              <Container width={4}>
                <Label.Group>{tags}</Label.Group>
              </Container>
              <Button color="teal" onClick={this.handleSubmit} style={{ marginTop: "3em", marginBottom: "3em" }}>
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
