import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import NotFound from '../NotFound';

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
    let copyText = document.createElement('textarea');
    copyText.value = window.location.href;
    copyText.setAttribute('readonly', '');
    copyText.style = {position: 'absolute', left: '-9999px'};

    document.body.appendChild(copyText);
    copyText.select();

    document.execCommand("Copy");
    alert("Copied the link!");
  }

  renderTags(tags) {
    return(
      tags.map((tag) => {
        return <span key={tag} className="tags">{tag}</span>;
      })
    );
  }

  render() {
    switch (this.state && this.state.user) {
      case null:
        return <NotFound />;

      default:
        let artist = this.state.user;
        return (
            <div className="row" style={{'textAlign': 'center'}}>
              <div className="col s6 offset-s3">

                <div className="row">
                  <img className="profile-image" src={`https://www.gravatar.com/avatar/${artist.email}`} />
                  <h2 className="profile-title">{artist.username}</h2>
                </div>

                  <div className="row">
                      <a href={this.props.location.pathname + '/tracks'}
                        className="blue lighten-2 waves-effect waves-light btn-large">
                        <i className="fas fa-play btn-far"></i> TRACKS
                      </a>
                      <a href="#" onClick={this.copyShareLink.bind(this)}
                        className="blue lighten-2 waves-effect waves-light btn-large">
                        <i className="fas fa-share btn-far"></i> SHARE
                      </a>
                      <a href={this.props.location.pathname + '/likes'}
                        className="blue lighten-2 waves-effect waves-light btn-large">
                        <i className="fas fa-heart btn-far"></i> LIKES
                      </a>
                  </div>

                <div className="row">
                  <div className="highlight">
                      <div className="row profile-entry">
                        <p className="profile-label">Username</p>
                        <p className="profile-data"><span className="username-icon">@</span> {artist.username}</p>
                      </div>
                      <div className="row profile-entry">
                        <p className="profile-label">About Me</p>
                        <p className="profile-data">
                          {artist.blurb}
                        </p>
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

              </div>
            </div>

        );
    }
  }
}

export default Artist;
