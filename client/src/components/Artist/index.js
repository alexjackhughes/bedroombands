import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import gravatar from "gravatar";

import NotFound from "../NotFound";

class Artist extends Component {
  componentDidMount() {
    axios.get(`/api/user/${this.props.match.params.userId}`).then(user => {
      this.setState({ user: user.data });
    });
  }

  /*
    Takes the current URL and adds it
    to the user's clipboard and sets an alert
   */
  copyShareLink() {
    let copyText = document.createElement("textarea");
    copyText.value = window.location.href;
    copyText.setAttribute("readonly", "");
    copyText.style = { position: "absolute", left: "-9999px" };

    document.body.appendChild(copyText);
    copyText.select();

    document.execCommand("Copy");
    alert("Copied the link!");
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

  render() {
    switch (this.state && this.state.user) {
      case null:
        return <NotFound />;

      default:
        let artist = this.state.user;
        let trackUrl = `https://w.soundcloud.com/player/?url=${
          artist.exampleTrack
        }&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
        let gravatarUrl = gravatar.url(artist.email, {
          s: "400",
          r: "pg",
          d: "404"
        });
        return (
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col s6 offset-s3 form-mobile">
              <div className="row">
                <img className="profile-image" src={gravatarUrl} />
                <h2 className="profile-title">{artist.username}</h2>
              </div>

              <div className="row">
                <a
                  href={this.props.location.pathname + "/tracks"}
                  className="blue lighten-2 waves-effect waves-light btn-large"
                >
                  <i className="fas fa-play btn-far" /> TRACKS
                </a>
                <a
                  href={this.props.location.pathname + "/likes"}
                  className="blue lighten-2 waves-effect waves-light btn-large"
                >
                  <i className="fas fa-heart btn-far" /> LIKES
                </a>
              </div>

              <div className="row">
                <div className="highlight">
                  <div className="row profile-entry">
                    <p className="profile-label">Username</p>
                    <p className="profile-data">
                      <span className="username-icon">@</span> {artist.username}
                    </p>
                  </div>
                  <div className="row profile-entry">
                    <p className="profile-label">About Me</p>
                    <p className="profile-data">{artist.blurb}</p>
                  </div>
                  <div className="row profile-entry">
                    <p className="profile-label">Instruments</p>
                    <div className="tags-section colum profile-tags-section">
                      {this.renderTags(artist.instruments)}
                    </div>
                  </div>
                  <div className="row profile-entry">
                    <p className="profile-label">Genres</p>
                    <div className="tags-section column profile-tags-section">
                      {this.renderTags(artist.genres)}
                    </div>
                  </div>
                </div>
              </div>

              {
                artist.exampleTrack !== "" ?
                <div className="row" style={{ marginTop: 30 }}>
                  <h2 className="profile-title">Portfolio</h2>
                  <p>
                    This is an example of some of{" "}
                    <strong>{artist.username}</strong>'s solo work
                  </p>
                  {
                    <iframe
                      width="100%"
                      height="300"
                      scrolling="no"
                      style={{ border: "0" }}
                      allow="autoplay"
                      src={trackUrl}
                    />
                  }
                </div>
                : <span />
              }

            </div>
          </div>
        );
    }
  }
}

export default Artist;
