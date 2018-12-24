import React, { Component } from "react";
import axios from "axios";

import Track from "../Track";

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // if (this.props.tracks === undefined) {
    let limit = this.state && this.state.limit ? this.state.limit : 10;

    axios
      .get(`/api/tracks/${limit}`)
      .then(tracks => {
        this.setState({ tracks: tracks.data, limit });
      })
      .then(tracks => {
      });
    // } else {
    //   console.log("from props", this.props.tracks);
    //
    //   let payload = {
    //     array: this.props.tracks,
    //     limit: 10
    //   };
    //
    //   axios({
    //     url: "/api/tracks/array",
    //     method: "post",
    //     data: payload
    //   })
    //     .then(tracks => {
    //       // your action after success
    //       console.log(tracks);
    //       this.setState({ tracks: tracks.data, limit: 10 });
    //     })
    //     .catch(function(error) {
    //       // your action on error success
    //       console.log(error);
    //     });
    // }
  }

  onChangeLimit() {
    this.setState(
      {
        limit: this.state.limit + 10
      },
      () => {
        console.log("updating state");

        axios.get(`/api/tracks/${this.state.limit}`).then(tracks => {
          console.log("hello", tracks.data);
          this.setState({ tracks: tracks.data });
        });
      }
    );
  }

  render() {
    switch (this.state && this.state.tracks) {
      case null:
        return <div />;

      default:
        return (
          <div style={{ textAlign: "center" }}>
            {this.state.tracks.map(track => {
              return <Track key={track._id} track={track} />;
            })}
            <button
              className="blue lighten-2 waves-effect waves-light btn-large"
              onClick={() => this.onChangeLimit()}
            >
              Load Tracks
            </button>
          </div>
        );
    }
  }
}
export default TrackList;
