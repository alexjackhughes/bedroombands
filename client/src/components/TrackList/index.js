import React, { Component } from "react";
import axios from "axios";

import Track from "../Track";

class TrackList extends Component {
  componentDidMount() {

    if(this.props.tracks === undefined) {
      axios
        .get("/api/tracks")
        .then(tracks => {
          this.setState({ tracks: tracks.data });
        })
        .then((tracks) => {
          console.log(tracks);
        });
    } else {
      console.log('from props', this.props.tracks);

      let payload = {
        array: this.props.tracks
      };

      axios({
        url: '/api/tracks/array',
        method: 'post',
        data: payload
      })
      .then((tracks) => {
          // your action after success
          console.log(tracks);
          this.setState({ tracks: tracks.data });
      })
      .catch(function (error) {
         // your action on error success
          console.log(error);
      });
    }
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
