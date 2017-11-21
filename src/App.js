import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Switch, Route } from "react-router-dom";

//COMPS
import { TopMenu } from "./Components/general";
import { Home } from "./Components/home";
import { MusicAdd } from "./Components/music_add_new";
import { MusicSearch } from "./Components/music_search";
import { MusicPlaylists } from "./Components/music_playlists";
import { Schools } from "./Components/schools";

export default class App extends Component {
  render() {
    return (
      <div>
        <TopMenu />
        <Route exact path="/" component={Home} />

        <Route path="/music/search" component={MusicSearch} />
        <Route path="/music/add" component={MusicAdd} />
        <Route path="/music/playlists" component={MusicPlaylists} />

        <Route path="/music/search" component={MusicSearch} />
        <Route path="/music/add" component={MusicAdd} />
        <Route path="/music/playlists" component={MusicPlaylists} />
        <Route path="/schools" component={Schools} />

        {/* <Route path="/schools" component={Schools} /> */}
      </div>
    );
  }
}
