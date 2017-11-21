import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Switch, Route } from "react-router-dom";

//COMPS
import { TopMenu } from "./Components/general";
import { Home } from "./Components/home";
import { MusicAdd } from "./Components/music_add_new";
import { MusicSearch } from "./Components/music_search";
import { MusicPlaylists } from "./Components/music_playlists";
<<<<<<< HEAD

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}
=======
import { Schools } from "./Components/schools";
>>>>>>> appleMusic

export default class App extends Component {
  render() {
    return (
      <div>
        <TopMenu />
        <Route exact path="/" component={Home} />

<<<<<<< HEAD
          <Route path="/music/search" component={MusicSearch} />
          <Route path="/music/add" component={MusicAdd} />
          <Route path="/music/playlists" component={MusicPlaylists} />
=======
        <Route path="/music/search" component={MusicSearch} />
        <Route path="/music/add" component={MusicAdd} />
        <Route path="/music/playlists" component={MusicPlaylists} />
        <Route path="/schools" component={Schools} />
>>>>>>> appleMusic

        {/* <Route path="/schools" component={Schools} /> */}
      </div>
    );
  }
}
