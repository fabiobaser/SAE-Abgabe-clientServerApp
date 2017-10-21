import React, { Component } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";

//COMPS
import { TopMenu } from "./Components/general";
import { MusicAdd } from "./Components/music_add";
import { MusicSearch } from "./Components/music_search";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <TopMenu />
        <div>
          <Route exact path="/" component={Home} />

          <Route path="/music/search" component={MusicSearch} />
          <Route path="/music/add" component={MusicAdd} />
          {/* <Route path="/music/playlists" component={Music.Playlists} /> */}

          {/* <Route path="/schools" component={Schools} /> */}
        </div>
      </div>
    );
  }
}
