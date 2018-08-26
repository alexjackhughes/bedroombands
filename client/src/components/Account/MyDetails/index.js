import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import _ from "lodash";

class MyDetails extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  renderList(items) {
    return items.map(item => {
      return <li key={item}>{item}</li>;
    });
  }

  renderTracks(tracks) {
    // Takes a list of track ids and renders list
    // of track components
  }

  render() {
    let user = _.get(this.props, "user");

    console.log(user);

    return (
      <div>
        <h3>My Details</h3>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Blurb: {user.blurb}</p>

        <h4>Genres</h4>
        <ul>{this.renderList(user.genres)}</ul>

        <h4>Instruments</h4>
        <ul>{this.renderList(user.instruments)}</ul>

        <h4>My Tracks</h4>
        <ul>{this.renderList(user.likedTracks)}</ul>

        <h4>My Liked Tracks</h4>
        <ul>{this.renderList(user.myTracks)}</ul>
      </div>
    );
  }
}

export default MyDetails;
