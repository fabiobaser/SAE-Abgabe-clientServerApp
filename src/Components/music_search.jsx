import React, { Component } from "react";
import axios from "axios";
import { Grid, Table, Label, Input, Icon, Button, Header, Container } from "semantic-ui-react";
// Config
const config = require("../config");

export class MusicSearch extends Component {
  constructor() {
    super();

    let tags = {};
    config.tags.map(item => {
      tags[item] = false;
    });

    let dances = config.dances;

    dances.latein.map(item => {
      dances.latein[item] = false;
    });

    dances.standard.map(item => {
      dances.standard[item] = false;
    });

    dances.misc.map(item => {
      dances.misc[item] = false;
    });

    this.state = {
      data: [],
      tags: tags,
      searchDances: config.dances,
      dances: dances
    };
  }

  componentWillMount() {
    let self = this;
    axios
      .get("http://localhost:5000/music/", {
        params: {
          title: ""
        }
      })
      .then(function(response) {
        self.setState({ data: response.data });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  handleSearchDance = e => {
    let searchDances = this.state.searchDances;
    searchDances[e.target.text] = !this.state.searchDances[e.target.text];
    this.setState(searchDances);
  };

  handleSearchTag = e => {
    let searchTags = this.state.searchTags;
    searchTags[e.target.text] = !this.state.searchTags[e.target.text];
    this.setState(searchTags);
  };

  render() {
    const { data } = this.state;

    let song = data.map((item, index) => {
      return (
        <Table.Row key={item.trackID}>
          <Table.Cell>{item.title}</Table.Cell>
          <Table.Cell>{item.artist}</Table.Cell>
          <Table.Cell>
            <Label.Group>
              {JSON.parse(item.dances).map((dance, danceIndex) => {
                return <Label key={danceIndex}>{dance.replace(/\b\w/g, l => l.toUpperCase())}</Label>;
              })}
            </Label.Group>
          </Table.Cell>
          <Table.Cell>
            <Label.Group>
              {JSON.parse(item.tags).map((tag, tagIndex) => {
                return (
                  <Label key={tagIndex} size="mini" tag>
                    {tag.replace(/bw/g, l => l.toUpperCase())}
                  </Label>
                );
              })}
            </Label.Group>
          </Table.Cell>
        </Table.Row>
      );
    });

    let searchDancesElem = Object.keys(this.state.searchDances).map(dance => {
      let labelState;
      if (this.state.searchDances[dance]) {
        labelState = "teal";
      } else {
        labelState = null;
      }
      return (
        <Label as="a" color={labelState} key={dance} onClick={this.handleSearchDance}>
          {dance}
        </Label>
      );
    });

    let searchTagsElem = Object.keys(this.state.tags).map((tag, tagIndex) => {
      let labelState;
      if (this.state.tags[tag]) {
        labelState = "teal";
      } else {
        labelState = null;
      }
      return (
        <Label as="a" key={tagIndex} color={labelState} onClick={this.handleSearchTag}>
          {tag}
        </Label>
      );
    });

    return (
      <div>
        <Header as="h1" textAlign="center">
          Tanzmusik-Datenbank durchsuchen
        </Header>
        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={3}>
              <Header as="h3">Nach Tanz suchen</Header>
              <Label.Group>{searchDancesElem}</Label.Group>
              <Header as="h3">Nach Schlagwort suchen</Header>
              <Label.Group tag>{searchTagsElem}</Label.Group>
            </Grid.Column>
            <Grid.Column width={11}>
              <Input fluid icon="search" />
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Songtitel</Table.HeaderCell>
                    <Table.HeaderCell>Interpret</Table.HeaderCell>
                    <Table.HeaderCell>Tänze</Table.HeaderCell>
                    <Table.HeaderCell>Schlagwörter</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>{song}</Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
