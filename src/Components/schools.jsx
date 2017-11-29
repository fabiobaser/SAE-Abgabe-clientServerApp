import React, { Component } from "react";
import { Grid, Label, Button, Image, Table, Icon, Header } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const mapStyle = require("./mapStyle.json");
//Config
// eslint-disable-next-line
import config from "../config";

const schulen = [
  {
    name: "Tanzschule Ring3",
    short: "Ring3",
    coords: { lat: 53.647072, lng: 10.057243 },
    tags: ["Paartanz", "Steppen", "Hip-Hop", "Zumba"]
  },
  { name: "Mein Tanzstudio", short: "Mein Tanzstudio", coords: { lat: 53.562643, lng: 10.07141 }, tags: ["Paartanz", "Ballet", "Yoga"] },
  { name: "Tanzschule S-Eins", short: "S-Eins", coords: { lat: 53.661095, lng: 10.086359 }, tags: ["Paartanz", "Schauspiel", "Gesang"] },
  {
    name: "Walter Bartel",
    short: "W. Bartel",
    coords: { lat: 53.569014, lng: 10.026308 },
    tags: ["Paartanz", "Yoga", "Hip-Hop"]
  },
  {
    name: "Schrittmacher",
    short: "Schrittmacher",
    coords: { lat: 53.560927, lng: 9.916891 },
    tags: ["Paartanz", "Swing", "Dancehall"]
  },
  {
    name: "Tangostudio el abrazo",
    short: "el abrazo",
    coords: { lat: 53.564711, lng: 9.921243 },
    tags: ["Tango Argentino"]
  },
  {
    name: "Ballettstudio Gitta Luckau",
    short: "Gitta Luckau",
    coords: { lat: 53.574244, lng: 10.019879 },
    tags: ["Ballett"]
  }
];
class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: config.coords["Hamburg"],
      zoom: 14,
      currentPosition: { lat: 0, lng: 0 }
    };

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        currentPosition: { lat: position.coords.latitude, lng: position.coords.longitude }
      });
      console.log(position.coords.accuracy);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ center: nextProps.center, currentPosition: this.state.currentPosition });
  }

  _onChange = ({ center, zoom }) => {
    this.setState({
      center,
      zoom
    });
  };

  placeClick = (e, { lat, lng }) => {
    this.setState({ center: { lat: lat, lng: lng }, zoom: 16 });
  };

  render() {
    return (
      <GoogleMapReact
        onChange={this._onChange}
        center={this.state.center}
        zoom={this.state.zoom}
        style={{ marginTop: "50px", height: "500px" }}
        options={{ fullscreenControl: false, styles: mapStyle }}>
        {schulen.map((schule, index) => {
          if (this.state.zoom > 13) {
            return (
              <Label
                tag
                // basic
                as="nobr" // Rendered as "nobr" to prevent linebrak through hyphens
                color="black"
                style={{ transform: "translate(2px, -48%)", cursor: "pointer" }}
                key={schule.name + index}
                lat={schule.coords.lat}
                lng={schule.coords.lng}
                onClick={this.placeClick}>
                {schule.short}
              </Label>
            );
          } else {
            return (
              <Label
                circular
                empty
                color="red"
                style={{ transform: "translate(-50%, -50%" }}
                key={schule.name}
                lat={schule.coords.lat}
                lng={schule.coords.lng}
                onClick={this.placeClick}
              />
            );
          }
        })}

        <Label
          empty
          circular
          color="blue"
          size="large"
          style={{
            boxShadow: "0 0 0 2px white, 0 0 0 " + (this.state.zoom * 4 - 30) + "px rgba(0,0,255,0.1)",
            width: "1em",
            transform: "translate(-46%,-44%)"
          }}
          lat={this.state.currentPosition.lat}
          lng={this.state.currentPosition.lng}
        />
      </GoogleMapReact>
    );
  }
}

export class Schools extends Component {
  constructor() {
    super();

    this.state = {
      center: config.coords["Hamburg"],

      currentPosition: { lat: 0, lng: 0 }
    };

    this.updatePosition();
  }

  calculateDistance = (lat1, lon1, lat2, lon2) => {
    var p = Math.PI / 180; // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  };

  formatPosition = schule => {
    let dist =
      Math.round(
        this.calculateDistance(schule.coords.lat, schule.coords.lng, this.state.currentPosition.lat, this.state.currentPosition.lng) * 100
      ) / 100;

    if (dist < 20) {
      return dist + " km";
    } else {
      return null;
    }
  };

  tableMarkerClick = (e, { value }) => {
    this.setState({ center: value });
  };

  updatePosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        currentPosition: { lat: position.coords.latitude, lng: position.coords.longitude }
      });
    });
  };

  render() {
    let schoolRows = schulen.map(schule => {
      return (
        <Table.Row key={schule.name}>
          <Table.Cell collapsing style={{ fontWeight: "400", fontSize: "120%" }}>
            {schule.name}
          </Table.Cell>
          <Table.Cell textAlign="left">{this.formatPosition(schule)}</Table.Cell>
          <Table.Cell textAlign="right">
            {schule.tags.map((tag, tagIndex) => {
              return (
                <Label basic key={tagIndex + " : " + tag}>
                  {tag}
                </Label>
              );
            })}
          </Table.Cell>
          <Table.Cell collapsing>
            <Label basic circular value={schule.coords} onClick={this.tableMarkerClick} style={{ cursor: "pointer" }}>
              <Icon name="marker" />Zeigen
            </Label>
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Grid>
        <Grid.Row columns={16} centered>
          <Header as="h1" style={{ marginTop: "2em", marginBottom: "2em" }}>
            Tanzschulen in deiner Nähe
          </Header>
        </Grid.Row>
        <Grid.Row columns={16} centered>
          <Grid.Column width={8} style={{ padding: "0" }}>
            <Table singleLine selectable>
              <Table.Body>{schoolRows}</Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={16} centered>
          <Grid.Column width={8} style={{ padding: "0" }} textAlign="center">
            <Button basic color="blue" onClick={this.updatePosition}>
              Wo bin ich?
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={16} centered>
          <Grid.Column width={12} style={{ paddingRight: "0" }}>
            <SimpleMap center={this.state.center} zoom={this.state.zoom} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
