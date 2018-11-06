import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";

import TrackList from "../TrackList";
import Track from "../Track";

class UserTracks extends Component {

  constructor() {
    super();
    this.state = {
      tracks: []
    };
  }
  componentDidMount() {

    axios.get(`/api/user/${this.props.match.params.userId}`).then(user => {
      this.setState({ user: user.data });
      console.log('user', user.data);

    }).then(() => {

      let tracks = [];

      // Set title & type of tracks
      if(this.props.match.params.type == 'tracks') {
        this.setState({title: 'My'});
        this.setState({tracks: this.state.user.myTracks});

      } else {
        this.setState({title: 'Liked'});
        this.setState({tracks: this.state.user.likedTracks});
      }
    });
  }

  render() {
    if(this.state && this.state.title && this.state.tracks.length !== 0) {
          return(

            <div className="row">
              <div className="centre col s8 offset-s2">
                <h1 className="profile-title">{this.state.title} Tracks</h1>
                <p>Ready to collaborate? You can upload a track <Link to="/upload/track">at any time</Link>!</p>
                <div className="row">
                  <TrackList tracks={this.state.tracks} />
                </div>
              </div>
              <Link to="/upload/track">
                <i className="fas fa-plus-circle upload-track" />
              </Link>
            </div>
          );
    }
    return(
      <div>
        <div className="row">
          <div className="centre col s8 offset-s2">
            <h1 className="profile-title">Tracks</h1>
            <p>Looks like you don't have any tracks here yet :(</p>
            <div className="row">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserTracks;
