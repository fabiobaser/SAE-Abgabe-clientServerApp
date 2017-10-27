import React, { Component } from "react";
import { Container, Table, Menu, Icon, Input } from "semantic-ui-react";

//DEPS
import axios from "axios";

export class AllMusicTable extends Component {
  constructor() {
    super();

    this.state = {
      musicData: [],
      isSearching: true,
      searchInput: ""
    };

    this.checkMetaData = this.checkMetaData.bind(this);
  }

  componentWillMount() {
    axios
      .get("http://localhost:5000/music/?title=")
      .then(result => {
        this.setState({ musicData: result.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  checkMetaData(e) {
    this.setState({ searchInput: e.target.value });
    //this.setState({ isLoading: true });
  }

  render() {
    let row = this.state.musicData.map((item, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{item.title}</Table.Cell>
          <Table.Cell>{item.artist}</Table.Cell>
          <Table.Cell>{item.length}</Table.Cell>
          <Table.Cell>{item.dances}</Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Container textAlign="center">
        <Input
          loading={this.state.isLoading}
          icon="search"
          placeholder="Nach Titel suchen ..."
          value={this.state.searchInput}
          onChange={this.checkMetaData}
        />

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{row}</Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="left chevron" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="right chevron" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    );
  }
}
