import React, { Component } from "react";

import { Header, Segment } from "semantic-ui-react";
//Config
// eslint-disable-next-line
import config from "../config";

export class Home extends Component {
  render() {
    return (
      <Segment
        fluid
        basic
        style={{
          marginTop: "0",
          background: "url(/assets/splash.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "calc(100vh - 72px)",
          textAlign: "center"
        }}>
        <Header as="h1" style={{ marginTop: "30vh", color: "white", fontSize: "500%", fontWeight: "400" }}>
          Projekt Tanzsalon
        </Header>
        <p style={{ color: "white", fontSize: "180%", fontWeight: "100" }}>BliBlaBlub hier kommt eine Subline hin</p>
      </Segment>
    );
  }
}
