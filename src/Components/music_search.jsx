import React, { Component } from "react";
import axios from "axios";
import { Grid, Table, Label, Input, Button, Header, Select } from "semantic-ui-react";
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
      return null;
    });

    this.state = {
      cycleCount: 0,
      data: [],
      column: null,
      direction: null,
      inputValue: "",
      searchSelect: "title",
      tags: tags,
      searchDances: [],
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
    if (searchDances.hasOwnProperty(name) && !searchDances[name]) {
      delete searchDances[name];
    }
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
    this.setState({ inputValue: data.value }, () => {
      this.handleSearchSubmit();
    });
  };

  handleSearchSubmit = (e, data) => {
    let self = this;

    let parameter = {};

    if (this.state.searchSelect === "title") {
      parameter = {
        type: this.state.searchSelect,
        title: this.state.inputValue
      };
    } else if (this.state.searchSelect === "artist") {
      parameter = {
        type: this.state.searchSelect,
        artist: this.state.inputValue
      };
    }

    axios
      .get("http://localhost:5000/music/", {
        params: parameter
      })
      .then(function(response) {
        self.setState({ data: response.data });
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  handleSearchEnter = (e, data) => {
    if (e.key === "Enter") {
      this.handleSearchSubmit();
    }
  };

  handleSelectChange = (e, data) => {
    this.setState({ searchSelect: data.value });
  };

  render() {
    let { data, column, direction, inputValue, searchSelect, searchDances } = this.state;

    let searchArr = Object.keys(searchDances);

    let newData = [];

    data.map((item, index) => {
      let sortedArray = sorts.sortObject(JSON.parse(item.dances), "desc");

      if (searchArr.length > 0) {
        searchArr.map(searchDance => {
          if (sortedArray.hasOwnProperty(searchDance)) {
            newData.push(data[index]);
            return;
          }
        });
      } else {
        newData = data;
      }
    });

    var uniq = new Set(newData.map(e => JSON.stringify(e)));

    var res = Array.from(uniq).map(e => JSON.parse(e));

    newData = res;

    let song = newData.map((item, index) => {
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
                color="teal"
                value={inputValue}
                onChange={this.handleInputChange}
                onKeyPress={this.handleSearchEnter}
                style={{ boxShadow: "0 0 20px 0px rgba(0,0,0,0.1)" }}>
                <input />
                <Select compact options={searchDrop} defaultValue="title" onChange={this.handleSelectChange} />
                {/* NOTE: Button can be reinserted when "onChange" does take too long because of DB size */}
                {/* <Button
                  color="teal"
                  icon="search"
                  style={{ paddingLeft: "1.5em", paddingRight: "1.5em" }}
                  onClick={this.handleSearchSubmit}
                /> */}
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
