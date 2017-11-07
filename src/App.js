import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Switch, Route } from "react-router-dom";

//COMPS
import { TopMenu } from "./Components/general";
import { MusicAdd } from "./Components/music_add";
import { MusicSearch } from "./Components/music_search";
import { MusicPlaylists } from "./Components/music_playlists";

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
          <Route path="/music/playlists" component={MusicPlaylists} />

          {/* <Route path="/schools" component={Schools} /> */}
        </div>
      </div>
    );
  }
}
