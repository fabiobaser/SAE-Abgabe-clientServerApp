import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
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
      <Menu pointing size="large">
        <Menu.Item as={NavLink} to="/" exact>
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} to="/add">
          Vorschlagen
        </Menu.Item>
        <Menu.Item as={NavLink} to="/music">
          Musik
        </Menu.Item>
        <Menu.Item as={NavLink} to="/map">
          Tanzschulen
        </Menu.Item>
      </Menu>
    );
  }
}
