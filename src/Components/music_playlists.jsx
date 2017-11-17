import React, { Component } from "react";
import axios from "axios";
import { Card, Feed, Label, Image } from "semantic-ui-react";
//Config
// eslint-disable-next-line
import config from "../config";
//Helper
import helper from "../Helper/converts";

export class MusicPlaylists extends Component {
  constructor() {
    super();

    this.state = {
      playlists: {}
    };
  }

  componentWillMount() {
    axios
      .get("https://api.music.apple.com/v1/catalog/de/playlists/" + "pl.66f5622f7f42454db4d3a28ad982ba1f", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
        }
      })
      .then(results => {
        console.log(results.data.data[0].attributes.name, results.data.data[0].relationships.tracks.data);
      });
  }

  render() {
    return (
      <Card>
        <Card.Content style={{ textAlign: "center" }}>
          {/* <Label color="yellow" ribbon="right">
            Training
          </Label> */}
          <Card.Header style={{ marginTop: "0.6em", marginBottom: "1em", fontSize: "150%" }}>Salsa</Card.Header>
          <Image size="small" src="https://is3-ssl.mzstatic.com/image/thumb/xu4j5QSmFEDlEHSSFKTp2A/1000x1000bb.jpg" />
          <br />

          <Image
            size="mini"
            as="a"
            src="/assets/Apple_Music_Icon.png"
            style={{
              marginTop: "1em",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 20px 0px",
              borderRadius: "10px",
              marginRight: "1em"
            }}
          />
          <Image
            size="mini"
            src="/assets/Spotify_Icon_RGB_Green.png"
            style={{
              marginTop: "1em",
              opacity: "0.2"
            }}
          />
        </Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label image="https://is3-ssl.mzstatic.com/image/thumb/Music111/v4/50/90/30/509030b7-9944-bbc2-31fc-62429a54802f/source/200x200bb.jpg" />
              <Feed.Content>
                <Feed.Date content="Ed sheeran" />
                <Feed.Summary>I see fire</Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    );
  }
}
