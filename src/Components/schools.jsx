import React, { Component } from "react";
import { Grid, Label } from "semantic-ui-react";
import GoogleMap from "google-map-react";

//Config
// eslint-disable-next-line
import config from "../config";

class SchoolMarker extends Component {
  render() {
    return (
      <Label color="red" tag>
        Ring3
      </Label>
    );
  }
}

class SimpleMap extends Component {
  static defaultProps = {
    center: { lat: 53.55, lng: 10 },
    zoom: 11
  };

  render() {
    return (
      <GoogleMap defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
        <SchoolMarker lat="53.647206" lng="10.057227" />
      </GoogleMap>
    );
  }
}

export class Schools extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row columns={16}>
          <Grid.Column width={4} />
          <Grid.Column width={8} style={{ height: "500px" }}>
            <SimpleMap />
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
      </Grid>
    );
  }
}
