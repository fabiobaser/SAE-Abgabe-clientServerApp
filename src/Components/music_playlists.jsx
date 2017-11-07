import React, { Component } from "react";
import axios from "axios";
import { Grid, Card, Feed } from "semantic-ui-react";
//Helper
const _ = require("lodash");
// Config
const config = require("../config");

export class MusicPlaylists extends Component {
  constructor() {
    super();

    this.state = {
      playlists: {
        "Dirty Dancing": [{ trackID: 2, title: "Hallo", artist: "Peter", cover: "" }]
      }
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
    );
  }
}
