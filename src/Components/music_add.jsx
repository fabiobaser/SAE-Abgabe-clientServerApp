import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Search, Container, Input, Image } from "semantic-ui-react";

export class MusicAdd extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  //Converts Milliseconds to Minutes:Seconds
  msToMinSec(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], titleValue: "", artistValue: "" });

  handleResultSelect = (e, { result }) => {
    this.setState({ titleValue: result.title });
    this.setState({ artistValue: result.description });
    this.setState({ cover: result.image });
    console.log(this.state);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ titleValue: value, isLoading: true });

    let completionArray = [];
    let trackName = encodeURI(value);
    let url = "http://itunes.apple.com/search?term=" + trackName + "&country=DE&media=music&limit=5&entity=song&attribute=songTerm";
    axios.get(url).then(response => {
      response.data.results.forEach((item, index) => {
        completionArray.push({
          title: item.trackName,
          description: item.artistName,
          image: item.artworkUrl100,
          key: index
        });
      });

      this.setState({ results: completionArray, isLoading: false });
    });
  };

  render() {
    const { isLoading, titleValue, artistValue, results, cover } = this.state;

    return (
      <Container>
        <Image src={cover} size="small" style={{ marginTop: "7em" }} />
        <Form>
          <Form.Field style={{ width: "22em" }}>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={results}
              value={titleValue}
              icon={null}
              placeholder="Titel"
            />
          </Form.Field>
          <Form.Field style={{ width: "22em" }} as={Input} placeholder="Interpret" value={artistValue} />
          <br />
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}
