import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import NotFound from '../NotFound';

class TrackExpanded extends Component {

  componentDidMount() {
    // should also have the track data
    console.log(this.props.match.params.trackId);

    axios
      .get(`/api/track/${this.props.match.params.trackId}`)
      .then(track => {
        this.setState({ track: track.data });
        console.log('track', this.state.track);
      })

      // Should get the users
      .then(data => {
        let users = [];

        this.state.track.artists.forEach(artist => {
          axios.get(`/api/user/${artist}`).then(user => {
            users.push(user.data);
          }).then((data) => {
            this.setState({ users: users });
            //console.log('users', this.state.users);
          });
        });
      });
  }

  // needs to call the like track api for this user
  likeTrack() {
    console.log('track liked');
  }

  renderArtistList(artists) {

    let links = [];

    artists.map(artist => {
      links.push(<Link key={artist.id} to={"/artist/" + artist._id} key={artist.id}>{artist.username}</Link>);
    });

    // Add spacing + commas
    let i = 0;
    let counter = 0;
    let artistList = [];

    while(i <= links.length) {

      artistList[i] = links[counter];

      // if last artist, don't add comma + spacing - else do
      if(i !== links.length) {
        artistList[i+1] = ', ';
        i++;
      }
      counter++;
      i++;
    }

    console.log(artistList);

    return artistList;
  }

  renderTags(tags) {
    return(
      tags.map((tag) => {
        return <span key={tag} className="tags">{tag}</span>;
      })
    );
  }

  // need to make rating clickable
  renderRating(rating) {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i className="fas fa-star btn-far"></i>);
    }

    return stars;
  }

  render() {
    switch (this.state && this.state.track && this.state.users !== undefined  && this.state.users.length !== 0) {
      case null:
        return <NotFound />;

      case (this.state.users !== undefined && this.state.users.length !== 0):
        let artists = this.state.users;
        let track = this.state.track;
        let trackUrl = `https://w.soundcloud.com/player/?url=${track.soundCloudUrl}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
        return (
            <div className="row" style={{'textAlign': 'center'}}>
              <div className="col s10 offset-s1">

                <div className="row">
                  <div className="track">

                    <div className="track-head">
                      <div className="row">
                        <div className="col s8">
                          <h1 className="track-title">{track.title}</h1>
                          <div className="track-authors"><span>By</span> {
                            artists !== undefined ?
                              this.renderArtistList(artists) :
                              <span>Loading Artists...</span>
                          }</div>
                        </div>
                        <div className="col s4 like-section">
                          <a href="#" onClick={this.likeTrack()} className="far fa-heart like-button"></a>
                        </div>
                      </div>
                    </div>

                    <iframe width="100%" height="300" scrolling="no" style={{'border':'0'}} allow="autoplay" src={trackUrl}></iframe>

                    <div className="track-bottom">
                      <div className="row profile-entry">
                        <p className="profile-label">About Track</p>
                        <p className="profile-data">
                          {track.description}
                        </p>
                      </div>
                      <div className="tags-section">
                        {this.renderTags(track.genres)}
                        {this.renderTags(track.instruments)}
                      </div>
                      <div className="row rating-section">
                        {this.renderRating(track.currentRating)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );

      default:
        return(<div></div>);
    }
  }
}

export default TrackExpanded;
