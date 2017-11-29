import React, { Component } from "react";
import axios from "axios";
<<<<<<< HEAD
import { Grid, Card, Feed } from "semantic-ui-react";
//Helper
const _ = require("lodash");
// Config
const config = require("../config");

export class MusicPlaylists extends Component {
import { Card, Feed, Image, Grid } from "semantic-ui-react";
=======
import { Card, Feed, Image, Grid, Button, Icon } from "semantic-ui-react";
>>>>>>> appleMusic
import ToolTip from "react-portal-tooltip";
//Config
// eslint-disable-next-line
import config from "../config";

class Playlist extends Component {
  constructor() {
    super();

    this.state = {
<<<<<<< HEAD
      playlists: {
        "Dirty Dancing": [{ trackID: 2, title: "Hallo", artist: "Peter", cover: "" }]
      }
=======
      spotifyNotif: false,
      expanded: false
>>>>>>> appleMusic
    };
  }

  componentWillMount() {
    axios.get(config.webserverURL + "music/playlists").then(response => {
      console.log(response.data);
    });
  }

  render() {
    let { playlists } = this.state;

    return (
      <Card>
        <Card.Content>
          <Card.Header>Dirty Dancing</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label image="/assets/images/avatar/small/jenny.jpg" />
              <Feed.Content>
                <Feed.Date content={playlists["Dirty Dancing"][0].artist} />
                <Feed.Summary>{playlists["Dirty Dancing"][0].title}</Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="/assets/images/avatar/small/molly.png" />
              <Feed.Content>
                <Feed.Date content="Interpret" />
                <Feed.Summary>Songtitel</Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="/assets/images/avatar/small/elliot.jpg" />
              <Feed.Content>
                <Feed.Date content="Interpret" />
                <Feed.Summary>Songtitel</Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="/assets/images/avatar/small/molly.png" />
              <Feed.Content>
                <Feed.Date content="Interpret" />
                <Feed.Summary>Songtitel</Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="/assets/images/avatar/small/elliot.jpg" />
              <Feed.Content>
                <Feed.Date content="Interpret" />
                <Feed.Summary>Songtitel</Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>

  showSpotifyNotif = () => {
    this.setState({ spotifyNotif: true });
  };

  hideSpotifyNotif = () => {
    this.setState({ spotifyNotif: false });
  };

  expandSongs = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    let dataSet = typeof this.props.playlists.length !== "undefined" && typeof this.props.playlists[this.props.index] !== "undefined";

    let songs,
      playlistName,
      appleMusic,
      artwork = "";

    if (dataSet) {
      playlistName = this.props.playlists[this.props.index].name;
      appleMusic = this.props.playlists[this.props.index].appleMusic;
      artwork = this.props.playlists[this.props.index].artwork;

      songs = this.props.playlists[this.props.index].tracks.map(song => {
        return (
          <PlaylistSong
            title={song.attributes.name}
            artist={song.attributes.artistName}
            cover={song.attributes.artwork.url.replace("{w}", "200").replace("{h}", "200")}
          />
        );
      });
    } else {
      null;
    }

    return (
      <Card fluid>
        <Card.Content style={{ textAlign: "center", paddingBottom: "0" }}>
          <Card.Header style={{ marginTop: "0.6em", marginBottom: "1em", fontSize: "150%" }}>{playlistName}</Card.Header>
          <Image size="small" src={artwork.replace("{w}", "500").replace("{h}", "500")} />
          <br />
          <a href={appleMusic} target="_blank">
            <Image
              size="mini"
              as="a"
              src="/assets/Apple_Music_Icon.png"
              style={{
                marginTop: "2em",
                marginBottom: "2em",
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 20px 0px",
                borderRadius: "10px",
                marginRight: "1em"
              }}
            />
          </a>
          <Image
            id="spotify"
            size="mini"
            src="/assets/Spotify_Icon_RGB_Green.png"
            onMouseEnter={this.showSpotifyNotif}
            onMouseLeave={this.hideSpotifyNotif}
            style={{
              marginTop: "2em",
              marginBottom: "2em",
              opacity: "0.2"
            }}
          />
          <ToolTip active={this.state.spotifyNotif} position="top" arrow="center" parent="#spotify">
            Spotify, ist momentan noch nicht unterstützt :(
          </ToolTip>
        </Card.Content>
        <Card.Content>
          <Feed>
            {this.state.expanded ? songs : null}
            <Feed.Event>
              <Feed.Content>
                <Feed.Summary style={{ textAlign: "center" }}>
                  <Button basic onClick={this.expandSongs}>
                    {this.state.expanded ? <Icon name="angle up" /> : <Icon name="angle down" />}
                    {this.state.expanded ? "Songs verdecken" : "Songs zeigen"}
                  </Button>
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    );
  }
}

class PlaylistSong extends Component {
  render() {
    return (
      <Feed.Event as="a">
        <Feed.Label image={this.props.cover} />
        <Feed.Content>
          <Feed.Summary>{this.props.title}</Feed.Summary>
          <Feed.Date content={this.props.artist} />
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export class MusicPlaylists extends Component {
  constructor() {
    super();

    this.state = {
      playlists: {}
    };
  }

  componentWillMount() {
    let tmp = [];
    axios
      .get("https://api.music.apple.com/v1/catalog/de/playlists/" + "pl.fa48b9d86caa4ddf81d3a8d2d42e070c", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
        }
      })
      .then(results => {
        tmp.push({
          name: results.data.data[0].attributes.name,
          appleMusic: results.data.data[0].attributes.url,
          tracks: results.data.data[0].relationships.tracks.data,
          artwork: results.data.data[0].attributes.artwork.url
        });
        this.setState({ playlists: tmp });
      });

    axios
      .get("https://api.music.apple.com/v1/catalog/de/playlists/" + "pl.f0644f96347447f086b89acf0f710441", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
        }
      })
      .then(results => {
        tmp.push({
          name: results.data.data[0].attributes.name,
          appleMusic: results.data.data[0].attributes.url,
          tracks: results.data.data[0].relationships.tracks.data,
          artwork: results.data.data[0].attributes.artwork.url
        });
        this.setState({ playlists: tmp });
      });

    axios
      .get("https://api.music.apple.com/v1/catalog/de/playlists/" + "pl.u-PZ7DuypbyP6", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
        }
      })
      .then(results => {
        tmp.push({
          name: results.data.data[0].attributes.name,
          appleMusic: results.data.data[0].attributes.url,
          tracks: results.data.data[0].relationships.tracks.data,
          artwork: results.data.data[0].attributes.artwork.url
        });
        this.setState({ playlists: tmp });
      });

    axios
      .get("https://api.music.apple.com/v1/catalog/de/playlists/" + "pl.0513010b42974e278816dbf91ac6dc6b", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
        }
      })
      .then(results => {
        tmp.push({
          name: results.data.data[0].attributes.name,
          appleMusic: results.data.data[0].attributes.url,
          tracks: results.data.data[0].relationships.tracks.data,
          artwork: results.data.data[0].attributes.artwork.url
        });
        this.setState({ playlists: tmp });
      });
  }

  render() {
    let playlists = [0, 1, 2, 3].map(item => {
      return (
        <Grid.Column computer={5} tablet={8} mobile={16} style={{ marginTop: "2em" }}>
          <Playlist index={item} playlists={this.state.playlists} key={item} />
        </Grid.Column>
      );
    });

    return (
      <Grid centered padded>
        <Grid.Row columns={16}>{playlists}</Grid.Row>
      </Grid>
>>>>>>> appleMusic
    );
  }
}
