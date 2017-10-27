import React, { Component } from "react";
import axios from "axios";
import { Grid, Table, Label, Input, Icon, Button, Header, Container, Select } from "semantic-ui-react";
//Helper
const sorts = require("../Helper/sorts");
const _ = require("lodash");
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
      cycleCount: 0,
      data: [],
      column: null,
      direction: null,
      inputValue: "",
      searchSelect: "title",
      tags: tags,
      searchDances: config.dances,
      dances: config.dances.latein.concat(config.dances.standard, config.dances.misc)
    };
  }

  componentWillMount() {
    this.setState({ cycleCount: this.state.cycleCount + 1 });
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

  handleSearchDance = (e, { name }) => {
    let searchDances = this.state.searchDances;
    searchDances[name] = !this.state.searchDances[name];
    this.setState(searchDances);
  };

  handleSearchTag = (e, { name }) => {
    let searchTags = this.state.tags;
    searchTags[name] = !this.state.tags[name];
    this.setState({ tags: searchTags });
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  handleInputChange = (e, data) => {
    this.setState({ inputValue: data.value });
  };

  handleSearchSubmit = (e, data) => {
    console.log("Hello, this is a test");
    console.log(this.state.inputValue);
  };

  handleSearchEnter = (e, data) => {
    if (e.key == "Enter") {
      this.handleSearchSubmit();
    }
  };

  render() {
    const { data, column, direction, inputValue, searchSelect } = this.state;

    let song = data.map((item, index) => {
      return (
        <Table.Row key={item.trackID}>
          <Table.Cell>{item.title}</Table.Cell>
          <Table.Cell>{item.artist}</Table.Cell>
          <Table.Cell>
            <Label.Group>
              {Object.keys(sorts.sortObject(JSON.parse(item.dances), "desc")).map((dance, danceIndex) => {
                let labelState;
                if (this.state.searchDances[dance]) {
                  labelState = "teal";
                } else {
                  labelState = null;
                }
                return (
                  <Label as="a" key={danceIndex} name={dance} color={labelState} onClick={this.handleSearchDance}>
                    {dance}
                    <Label.Detail>{JSON.parse(item.dances)[dance]}</Label.Detail>
                  </Label>
                );
              })}
            </Label.Group>
          </Table.Cell>
          <Table.Cell>
            <Label.Group>
              {Object.keys(JSON.parse(item.tags)).map((tag, tagIndex) => {
                let labelState;
                if (this.state.tags[tag]) {
                  labelState = "pink";
                } else {
                  labelState = null;
                }
                return (
                  <Label as="a" key={tagIndex} name={tag} color={labelState} size="mini" tag onClick={this.handleSearchTag}>
                    {tag}
                    <Label.Detail>{JSON.parse(item.tags)[tag]}</Label.Detail>
                  </Label>
                );
              })}
            </Label.Group>
          </Table.Cell>
        </Table.Row>
      );
    });

    let searchDancesElem = this.state.dances.map(dance => {
      let labelState;
      if (this.state.searchDances[dance]) {
        labelState = "teal";
      } else {
        labelState = null;
      }
      return (
        <Label as="a" color={labelState} key={dance} name={dance} onClick={this.handleSearchDance}>
          {dance}
        </Label>
      );
    });

    let searchTagsElem = Object.keys(this.state.tags).map((tag, tagIndex) => {
      let labelState;
      if (this.state.tags[tag]) {
        labelState = "pink";
      } else {
        labelState = null;
      }
      return (
        <Label as="a" key={tagIndex} color={labelState} name={tag} onClick={this.handleSearchTag}>
          {tag}
        </Label>
      );
    });

    const searchDrop = [{ key: "title", text: "Titel", value: "title" }, { key: "artist", text: "Künstler", value: "artist" }];

    return (
      <div>
        <Header as="h1" textAlign="center">
          Tanzmusik-Datenbank durchsuchen
        </Header>
        <Grid>
          <Grid.Row style={{ marginTop: "3em", marginBottom: "3em" }}>
            <Grid.Column width={5} />
            <Grid.Column width={6}>
              <Input
                type="text"
                placeholder="Suchen..."
                size="big"
                action
                fluid
                value={inputValue}
                onChange={this.handleInputChange}
                onKeyPress={this.handleSearchEnter}>
                <input />
                <Select compact options={searchDrop} value={searchSelect} />
                <Button
                  color="teal"
                  icon="search"
                  style={{ paddingLeft: "1.5em", paddingRight: "1.5em" }}
                  onClick={this.handleSearchSubmit}
                />
              </Input>
            </Grid.Column>
            <Grid.Column width={5} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={3}>
              <Header as="h3">Nach Tanz suchen</Header>
              <Label.Group>{searchDancesElem}</Label.Group>
              <Header as="h3">Nach Schlagwort suchen</Header>
              <Label.Group tag>{searchTagsElem}</Label.Group>
            </Grid.Column>
            <Grid.Column width={11}>
              <Table sortable celled fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell sorted={column === "title" ? direction : null} onClick={this.handleSort("title")}>
                      Songtitel
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === "artist" ? direction : null} onClick={this.handleSort("artist")}>
                      Interpret
                    </Table.HeaderCell>
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
