import React, { Component } from "react";
import axios from "axios";

import Track from "../Track";

class TrackList extends Component {
  componentDidMount() {
    axios
      .get("/api/tracks")
      .then(tracks => {
        this.setState({ tracks: tracks.data });
      })
      .then((tracks) => {
        console.log(tracks);
      });
  }

  render() {
    switch (this.state && this.state.tracks) {
      case null:
        return <div>Loading...</div>;

      default:
        return this.state.tracks.map(track => {
          return <Track key={track._id} track={track} />;
        });
    }
  }
}
export default TrackList;
