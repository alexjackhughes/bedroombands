import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import NotFound from "../NotFound";

class Track extends Component {
  constructor() {
    super();
    this.state = {
      trackRated: false
    };
  }

  componentDidMount() {
    let users = [];

    this.props.track.artists.forEach(artist => {
      axios
        .get(`/api/user/${artist}`)
        .then(user => {
          users.push(user.data);
        })
        .then(data => {
          this.setState({ users: users });
        });
    });
  }

  // Rating track - need to make api call
  rateTrack(e, rating) {
    let id = this.props.track._id;

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
  }

  deleteTrack() {
    let id = this.props.track._id;

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
    let id = this.props.track._id;

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
    let id = this.props.track._id;
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
    this.props.track.artists.map(artist => {
      if (String(this.props.auth._id) === String(artist)) {
        x = true;
      }
    });

    if (x) {
      return (
        <div className="row">
          {/* <div onClick={() => this.editTrack()} className="far fa-edit track-tools edit-icon" /> */}
          <div
            onClick={() => this.deleteTrack()}
            className="far fa-trash-alt track-tools delete-icon"
          />
        </div>
      );
    }
    return <span />;
  }

  render() {
    switch (
      this.state &&
        this.state.track &&
        this.state.users !== undefined &&
        this.state.users.length !== 0 &&
        this.props.auth &&
        this.props.track
    ) {
      case null:
        return <span />;

      default:
        let artists = this.state.users;
        let track = this.props.track;
        let trackDescription = this.props.track.description
          ? this.props.track.description.substring(0, 60) + "..."
          : "";

        let trackUrl = `https://w.soundcloud.com/player/?url=${
          track.soundCloudUrl
        }&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
        return (
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col s10 offset-s1 track-mobile">
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
                    <div className="row profile-entry track-authors">
                      <p className="profile-data">{trackDescription}</p>
                      <Link to={"/track/" + track._id}>Read more</Link>
                    </div>
                    {
                      // <div className="row rating-section">
                      //   {this.renderRating(track.currentRating)}
                      // </div>
                    }
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
              </div>
            </div>
          </div>
        );
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Track);
