import React, { Component } from "react";
import { Menu, Dropdown, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export class TopMenu extends Component {
  constructor() {
    super();

    this.state = {
      activeMenu: ""
    };
  }
  render() {
    return (
      <Segment inverted style={{ borderRadius: "0" }}>
        <Menu inverted pointing secondary>
          <Menu.Item header>Projekt Tanzsalon</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/" exact>
              Home
            </Menu.Item>
            <Dropdown item text="Musik">
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/music/search">
                  Suchen
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/music/add">
                  Vorschlagen
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/music/playlists">
                  Playlists
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item as={NavLink} to="/schools">
              Tanzschulen
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}
