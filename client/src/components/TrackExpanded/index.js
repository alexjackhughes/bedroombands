import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import NotFound from "../NotFound";

class TrackExpanded extends Component {
  constructor() {
    super();

    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSoundCloudUrl = this.handleSoundCloudUrl.bind(this);
    this.handleType = this.handleType.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // should also have the track data
    console.log(this.props.match.params.trackId);

    axios.get(`/api/track/${this.props.match.params.trackId}`).then(track => {
      this.setState({ track: track.data });
      console.log("track", track.data);

      this.setState({
        trackUpdated: false,
        editTrack: false,
        title: track.data.title,
        description: track.data.description,
        soundCloudUrl: track.data.soundCloudUrl,
        type: track.data.type,
        artists: track.data.artists,
        genres: track.data.genres,
        instruments: track.data.instruments
      });

      let users = [];

      track.data.artists.forEach(artist => {
        axios
          .get(`/api/user/${artist}`)
          .then(user => {
            users.push(user.data);
          })
          .then(data => {
            this.setState({ users: users });
            //console.log('users', this.state.users);
          });
      });
    });
  }

  // Rating track - need to make api call
  rateTrack(e, rating) {
    let id = this.state.track._id;
    console.log("rating", rating);

    axios
      .put("/api/rate-track/" + id + "/rating/" + rating)
      // handle success
      .then(response => {
        console.log(response);
      })
      // handle error
      .catch(error => {
        console.log("Error", error);
      })
      // always executed
      .then(() => {
        this.setState({ trackRated: true });
        console.log("track liked");
      });
  }

  editTrack() {
    console.log("track Edited");
    this.setState({ editTrack: true });
  }

  deleteTrack() {
    let id = this.state.track._id;

    console.log("working delete");

    axios
      .delete("/api/track/" + id)
      // handle success
      .then(response => {
        console.log("Track deleted");
      })
      // handle error
      .catch(error => {
        console.log("Error", error);
      });
  }

  // Allows the user to like a track
  likeTrack() {
    let id = this.state.track._id;

    axios
      .put("/api/liked-tracks/" + id)
      // handle success
      .then(response => {
        console.log(response);
      })
      // handle error
      .catch(error => {
        console.log("Error", error);
      })
      // always executed
      .then(() => {
        console.log("track liked");
        window.location.reload();
      });
  }

  renderArtistList(artists) {
    let links = [];

    artists.map(artist => {
      links.push(
        <Link key={artist.id} to={"/artist/" + artist._id} key={artist.id}>
          {artist.username}
        </Link>
      );
    });

    // Add spacing + commas
    let i = 0;
    let counter = 0;
    let artistList = [];

    while (i <= links.length) {
      artistList[i] = links[counter];

      // if last artist, don't add comma + spacing - else do
      if (i !== links.length) {
        artistList[i + 1] = ", ";
        i++;
      }
      counter++;
      i++;
    }

    return artistList;
  }

  renderTags(tags) {
    return tags.map(tag => {
      return (
        <span key={tag} className="tags">
          {tag}
        </span>
      );
    });
  }

  renderLikeButton() {
    let id = this.state.track._id;
    console.log("true", this.props.auth.likedTracks.indexOf(id) > -1);
    if (this.props.auth.likedTracks.indexOf(id) > -1) {
      return (
        <a
          href="#"
          onClick={() => this.likeTrack()}
          className="fas fa-heart like-button"
        />
      );
    } else {
      return (
        <a
          href="#"
          onClick={() => this.likeTrack()}
          className="far fa-heart like-button"
        />
      );
    }
  }

  renderRating(rating) {
    let stars = [];

    for (let index = 0; index < rating; index++) {
      stars.push(
        <i
          key={index}
          onClick={e => {
            this.rateTrack(e, index + 1);
          }}
          className="fas fa-star btn-far"
        />
      );
    }

    for (let index = rating; index < 5; index++) {
      stars.push(
        <i
          key={index}
          onClick={e => {
            this.rateTrack(e, index + 1);
          }}
          className="far fa-star btn-far"
        />
      );
    }

    return stars;
  }

  // loop through artists and see if id matches logged in user
  renderEditingTools() {
    let x = false;
    this.state.track.artists.map(artist => {
      if (String(this.props.auth._id) === String(artist)) {
        x = true;
      }
    });

    if (x) {
      return (
        <div className="row">
          <div
            onClick={() => this.editTrack()}
            className="far fa-edit track-tools edit-icon"
          />
          <div
            onClick={() => this.deleteTrack()}
            className="far fa-trash-alt track-tools delete-icon"
          />
        </div>
      );
    }
    return <span />;
  }

  handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleSoundCloudUrl(event) {
    this.setState({ soundCloudUrl: event.target.value });
  }

  handleType(event) {
    this.setState({ type: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("state", this.state);

    let track = {
      title: this.state.title,
      soundCloudUrl: this.state.soundCloudUrl,
      description: this.state.description,
      artists: this.state.artists,
      ratings: this.state.track.ratings,
      currentRating: this.state.track.currentRating,
      genres: this.state.track.genres,
      instruments: this.state.track.instruments,
      type: this.state.type
    };

    axios.put("/api/track/" + this.state.track._id, track).then(data => {
      console.log("user api was updated");
      this.setState({ trackUpdated: true });
    });
  }

  render() {
    if (this.state && this.state.track && this.props.auth) {
      let artists = this.state.users;
      let track = this.state.track;
      let trackUrl = `https://w.soundcloud.com/player/?url=${
        track.soundCloudUrl
      }&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
      return (
        <div className="row" style={{ textAlign: "center" }}>
          <div className="col s8 offset-s2 track-mobile">
            <div className="row">
              <div className="track">
                <div className="track-head">
                  <div className="row">
                    <div className="col s8">
                      <h1 className="profile-title">{track.title}</h1>
                      <div className="track-authors">
                        <span>By</span>{" "}
                        {artists !== undefined ? (
                          this.renderArtistList(artists)
                        ) : (
                          <span>Loading Artists...</span>
                        )}
                      </div>
                    </div>
                    <div className="col s4 like-section">
                      {this.renderLikeButton()}
                    </div>
                  </div>
                </div>

                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  style={{ border: "0" }}
                  allow="autoplay"
                  src={trackUrl}
                />

                <div className="track-bottom">
                  <div className="row profile-entry">
                    <p className="profile-label">About Track</p>
                    <p className="profile-data">{track.description}</p>
                  </div>
                  <div className="tags-section">
                    {this.renderTags(track.genres)}
                    {this.renderTags(track.instruments)}
                  </div>
                  {
                    // <div className="row rating-section">
                    //   {this.renderRating(track.currentRating)}
                    // </div>
                  }
                  {this.renderEditingTools()}
                </div>
              </div>
            </div>

            {/* Set an alert when rating */}
            {this.state.trackRated ? (
              <div class="alert success add-top-space">
                <p>Thanks for rating this track!</p>
              </div>
            ) : (
              <span />
            )}

            {this.state.editTrack ? (
              <div className="row">
                <h1 className="profile-title">Edit Track</h1>
                {/* Form displays here */}
                <form onSubmit={this.handleSubmit}>
                  <div className="highlight edit-track-form">
                    <div className="row profile-entry">
                      <p className="profile-label">Track Title</p>
                      <div className="profile-data">
                        <input
                          className="input-data"
                          type="text"
                          value={this.state.title}
                          onChange={this.handleTitle}
                        />
                      </div>
                    </div>

                    <div className="row profile-entry">
                      <p className="profile-label">Description</p>
                      <div className="profile-data">
                        <input
                          className="input-data"
                          type="text"
                          value={this.state.description}
                          onChange={this.handleDescription}
                        />
                      </div>
                    </div>

                    <div className="row profile-entry">
                      <p className="profile-label">SoundCloud URL</p>
                      <div className="profile-data">
                        <input
                          className="input-data"
                          type="text"
                          value={this.state.soundCloudUrl}
                          onChange={this.handleSoundCloudUrl}
                        />
                      </div>
                    </div>

                    <div className="row profile-entry">
                      <p className="profile-label">Type</p>
                      <div className="profile-data">
                        <input
                          className="input-data"
                          type="text"
                          value={this.state.type}
                          onChange={this.handleType}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="green accent-3 waves-effect waves-light btn-large right"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <span />
            )}

            {/* Set an alert when updating */}
            {this.state.trackUpdated ? (
              <div class="alert success add-top-space">
                <p>Thanks for updating this track!</p>
              </div>
            ) : (
              <span />
            )}
          </div>
        </div>
      );
    }
    return <div />;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(TrackExpanded);
