import React, { Component } from "react";
import axios from "axios";
import { Grid, Input, Button, Table, Header, Modal, Image, Segment, Loader, Dimmer, Label, Container } from "semantic-ui-react";
//Config
// eslint-disable-next-line
import config from "../config";
//Helper
import helper from "../Helper/converts";

class SongRow extends Component {
  constructor() {
    super();

    this.state = {
      playing: false,
      modalOpen: false
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
      coverURL: "",
      activeDanceTags: [],
      dancesArray: [],
      tagsArray: [],
      dances: dances,
      tags: tags,
      success: false
    });
  };

  handlePlayPause = (e, { value }) => {
    let audio = document.getElementById("audio");
    let source = document.getElementById("audioSource");
    if (source.src === value) {
      if (audio.paused) {
        this.setState({ playing: true }, () => {
          audio.play();
        });
      } else {
        this.setState({ playing: false }, () => {
          audio.pause();
        });
      }
    } else {
      source.src = value;
      audio.load();
      this.setState({ playing: true }, () => {
        audio.play();
      });
    }

    audio.addEventListener(
      "ended",
      () => {
        this.setState({ playing: false });
      },
      false
    );
  };

  handleAddClick = (e, data) => {
    this.handleModalOpen();
    this.setState({
      titleValue: this.props.title,
      artistValue: this.props.artist,
      coverURL: this.props.coverURL,
      appleMusicID: this.props.appleMusicID
    });
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

  lateinClick = e => {
    let localDancesArray = this.state.dancesArray;
    if (localDancesArray.indexOf(e.target.text) === -1) {
      localDancesArray.push(e.target.text);
    } else {
      localDancesArray.splice(localDancesArray.indexOf(e.target.text), 1);
    }

    //toggle
    let tmp = this.state.dances;
    tmp.latein[e.target.text] = !tmp.latein[e.target.text];
    this.setState({ dances: tmp });
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
    tmp.standard[e.target.text] = !tmp.standard[e.target.text];
    this.setState({ dances: tmp });
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
    tmp.misc[e.target.text] = !tmp.misc[e.target.text];
    this.setState({ dances: tmp });
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
    tmp[e.target.text] = !tmp[e.target.text];
    this.setState({ tags: tmp });
  };

  handleSubmit = e => {
    e.preventDefault();

    let errorState = {
      dances: false
    };

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

    if (!errorState.dances) {
      console.log(this.state.titleValue, this.state.artistValue, this.state.dancesArray, this.state.tagsArray, this.state.coverURL);

      axios
        .get("http://localhost:5000/music/add", {
          params: {
            appleMusicID: this.state.appleMusicID,
            title: this.state.titleValue.replace(regex, subst),
            artist: this.state.artistValue.replace(regex, subst),
            dances: JSON.stringify(this.state.dancesArray),
            tags: JSON.stringify(this.state.tagsArray),
            coverURL: this.state.coverURL
          }
        })
        .then(function(response) {
          self.resetComponent();
          self.handleModalClose();
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

  handleModalOpen = () => this.setState({ modalOpen: true });

  handleModalClose = () => this.setState({ modalOpen: false });

  render() {
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
      <Table.Row>
        <Table.Cell collapsing>
          <Image ui src={this.props.coverURL.replace("{w}", "100").replace("{h}", "100")} size="tiny" />
        </Table.Cell>
        <Table.Cell collapsing>
          <Button
            basic
            circular
            size="small"
            icon={this.state.playing ? "pause" : "play"}
            onClick={this.handlePlayPause}
            value={this.props.previewURL}
          />
        </Table.Cell>
        <Table.Cell>
          <span className="add_table_title">{this.props.title}</span>
          <br />
          <span className="add_table_artist">{this.props.artist}</span>
          {/* <Progress percent={23} attached="bottom" style={{ transform: "translateY(15px)" }} /> */}
        </Table.Cell>
        <Table.Cell textAlign="right" collapsing>
          {this.props.time}
        </Table.Cell>
        <Table.Cell collapsing>
          <Modal
            basic
            open={this.state.modalOpen}
            onClose={this.handleModalClose}
            closeIcon
            trigger={
              <Button
                basic
                circular
                size="small"
                icon="add"
                style={{ background: "red" }}
                onClick={this.handleAddClick}
                className="searchAddBtn"
              />
            }
            style={{ textAlign: "center" }}>
            <Modal.Header>
              <Header as="h1" style={{ marginBottom: "0", fontSize: "260%", fontWeight: "100", color: "white" }}>
                {this.props.title}
              </Header>
              <Header as="h3" style={{ marginTop: "0", marginBottom: "3em", fontSize: "120%", fontWeight: "400", color: "white" }}>
                {this.props.artist}
              </Header>
            </Modal.Header>
            <Modal.Content textAlign="center">
              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Image
                      wrapped
                      fluid
                      src={this.props.coverURL.replace("{w}", "400").replace("{h}", "400")}
                      style={{ display: "inline-block" }}
                    />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    {this.state.errorDances && (
                      <Label basic color="red" style={{ marginBottom: "2em" }}>
                        Wähle bitte mindestens einen Tanz aus
                      </Label>
                    )}
                    <p style={{ fontWeight: 400 }}>Und was kann man dazu tanzen?</p>
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

                    <p style={{ fontWeight: 400 }}>Etwas bessonderes?</p>
                    <Container width={4}>
                      <Label.Group>{tags}</Label.Group>
                    </Container>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Button color="pink" onClick={this.handleSubmit} style={{ marginTop: "3em", marginBottom: "3em" }}>
                      Abschicken
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
          </Modal>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export class MusicAdd extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: "Nothing else",
      searchResults: [],
      isLoading: false,
      searchType: "songs"
    };
  }

  componentWillMount() {
    this.updateSongs("");
  }

  updateSongs = value => {
    if (value !== "") {
      this.setState({ isLoading: true });
      axios
        .get("https://api.music.apple.com/v1/catalog/de/search", {
          params: {
            term: value,
            types: "songs",
            limit: "20"
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
          }
        })
        .then(axiosResult => {
          if (!!Object.keys(axiosResult.data.results).length) {
            this.setState({ searchResults: axiosResult.data.results.songs.data, searchFound: true });
          } else {
            this.setState({ searchFound: false });
          }
          this.setState({ isLoading: false });
        });
    } else {
      this.setState({ isLoading: true });
      axios
        .get("https://api.music.apple.com/v1/catalog/de/charts", {
          params: {
            types: "songs",
            limit: "20"
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
          }
        })
        .then(axiosResult => {
          this.setState({ searchResults: axiosResult.data.results.songs[0].data });
          this.setState({ isLoading: false });
        });
    }
  };

  handleSearchInputChange = (e, { value }) => {
    this.setState({ searchResults: [] }, () => {
      this.updateSongs(value);
      this.setState({ searchTerm: value });
    });
  };

  render() {
    let { searchResults, isLoading } = this.state;

    let songs = searchResults.map((item, index) => {
      return (
        <SongRow
          appleMusicID={item.id}
          title={item.attributes.name}
          artist={item.attributes.artistName}
          time={helper.millisToMin(item.attributes.durationInMillis)}
          coverURL={item.attributes.artwork.url}
          colors={item.attributes.artwork}
          previewURL={item.attributes.previews[0].url}
          key={item.id}
        />
      );
    });
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <Input
              transparent
              fluid
              className="addSearchInput"
              placeholder="Song finden ..."
              style={{ fontSize: "4em", textAlign: "center", marginTop: "1em", marginBottom: "1em" }}
              onChange={this.handleSearchInputChange}
            />
          </Grid.Column>
          <Grid.Column width={3} />
        </Grid.Row>
        <Grid.Row textAlign="center">
          <Grid.Column width={16}>
            <Header as="h5" style={{ fontStyle: "italic", color: "rgba(0,0,0,0.4)" }}>
              TIPP: Song suchen > Rechts auf Plus drücken > Tänze auswählen
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <Segment basic style={{ minHeight: "15em" }}>
              <Dimmer active={isLoading}>
                <Loader>Lädt funky Musik</Loader>
              </Dimmer>
              <Table singleLine>
                <Table.Body>{songs}</Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
    );
  }
}
