import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileDetail extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <img
            className="profile-image"
            src={"https:" + this.props.gravatarUrl}
          />
          <p className="gravatar-text">
            You can change your profile image at any time using{" "}
            <a href="https://en.gravatar.com/" target="_blank">
              Gravatar
            </a>{" "}
            - just sign in with the same email you used to sign up to
            BedroomBands.
          </p>
          <h2 className="profile-title">{this.props.username}</h2>
        </div>

        <div className="row centre">
          <Link
            to={"/artist/" + this.props.id + "/tracks"}
            className="blue lighten-2 waves-effect waves-light btn-large"
          >
            <i className="fas fa-play btn-far" /> TRACKS
          </Link>
          <Link
            to={"/artist/" + this.props.id}
            className="blue lighten-2 waves-effect waves-light btn-large"
          >
            <i className="fas fa-user-circle btn-far" /> MY PROFILE
          </Link>
          <Link
            to={"/artist/" + this.props.id + "/likes"}
            className="blue lighten-2 waves-effect waves-light btn-large"
          >
            <i className="fas fa-heart btn-far" /> LIKES
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfileDetail;
