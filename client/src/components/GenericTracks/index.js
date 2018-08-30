import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";

import TrackList from "../TrackList";
import Track from "../Track";

class GenericTracks extends Component {
  constructor() {
    super();
    this.state = {
      tracks: []
    };
  }

  // need to add tracks
  componentDidMount() {
    if (this.props.match.params.type == "rating") {
      let rating = this.props.match.params.rating;
      this.setState({ title: "Rated " + rating + "*" });

      axios.get(`/api/tracks/rating/${rating}`).then(tracks => {
        this.setState({ tracks: tracks.data });
        console.log("data from api", tracks);
      });
    } else {
      let title = this.props.match.params.type.replace(/\b\w/g, l =>
        l.toUpperCase()
      );
      let type = this.props.match.params.type;
      this.setState({ title: title });

      axios.get(`/api/tracks/type/${type}`).then(tracks => {
        this.setState({ tracks: tracks.data });
        console.log("data from api", tracks);
      });
    }
  }

  render() {
    if (this.state && this.state.title && this.state.tracks.length !== 0) {
      return (
        <div className="row">
          <div className="centre col s8 offset-s2 track-mobile">
            <h1 className="profile-title">{this.state.title} Tracks</h1>
            <div className="row">
              <TrackList tracks={this.state.tracks} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          <div className="centre col s8 offset-s2">
            <h1 className="profile-title">Tracks</h1>
            <p>Looks like you don't have any tracks here yet :(</p>
            <div className="row">
              <TrackList tracks={this.state.tracks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GenericTracks;
