import React, { Component } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";

//COMPS
import { TopMenu } from "./Components/general";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

class Add extends Component {
  render() {
    return <h1>Musik vorschlagen</h1>;
  }
}

class Music extends Component {
  render() {
    return <h1>Musik durchstöbern</h1>;
  }
}

class Map extends Component {
  render() {
    return <h1>Tanzschulen</h1>;
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <TopMenu />
        <a href="/add">hauhsu</a>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={Add} />
          <Route path="/music" component={Music} />
          <Route path="/map" component={Map} />
        </div>
      </div>
    );
  }
}
