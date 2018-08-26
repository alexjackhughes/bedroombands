import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import gravatar from 'gravatar';

import * as actions from "../../actions";
import RFReactSelect from "./RFReactSelect";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleBlurbChange = this.handleBlurbChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleGenresChange = this.handleGenresChange.bind(this);
    this.handleInstrumentsChange = this.handleInstrumentsChange.bind(this);
  }

  componentDidMount() {
    console.log('props', this.props);

    this.setState({
      settingsSubmit:false
    });
  }

  /* Event Handlers */

  handleUsernameChange(event) {
    event.target.value = event.target.value
      .toLowerCase()
      .replace(/[^A-Z0-9]/gi, "");

    this.setState({ username: event.target.value });
  }

  handleBlurbChange(event) {
    this.setState({ blurb: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleGenresChange(values) {
    this.setState({ genres: values });
  }

  handleInstrumentsChange(values) {
    this.setState({ instruments: values });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log('submit');

    if (!this.state.username) {
      this.state.username = this.props.auth.username;
    }

    if (!this.state.email) {
      this.state.email = this.props.auth.email;
    }

    if (!this.state.blurb) {
      this.state.blurb = this.props.auth.blurb;
    }

    if (!this.state.genres) {
      this.state.genres = this.props.auth.genres;
    }

    if (!this.state.instruments) {
      this.state.instruments = this.props.auth.instruments;
    }

    if (!this.state.likedTracks) {
      this.state.likedTracks = this.props.auth.likedTracks;
    }

    if (!this.state.myTracks) {
      this.state.myTracks = this.props.auth.myTracks;
    }

    /* Could call the api directly */
    console.log(this.state);
    axios.put("/api/current_user", this.state).then(data => {
      console.log("user api was updated");
    });

    this.setState({settingsSubmit: true});

    //actions.submitUser(this.state, this.props.history);
  }

  /* Render Components */

  renderUserForm() {

    const genres = [
      { value: "Techno", label: "Techno" },
      { value: "Rock", label: "Rock" },
      { value: "Metal", label: "Metal" }
    ];

    const instruments = [
      { value: "Guitar", label: "Guitar" },
      { value: "Accordion", label: "Accordion" },
      { value: "Bandola", label: "Bandola" }
    ];

    switch (this.props && this.props.auth) {
      case null:
        return <div>Loading...</div>;

      case false:
        return <Redirect to="/" />;

      default:
        console.log('auth', this.props.auth);
        let artist = this.props.auth;
        let gravatarUrl = gravatar.url(artist.email, {s: '400', r: 'pg', d: '404'});
        return (
          <div className="row">
            <div className="col s6 offset-s3">
              <div className="row centre">

                {
                  artist.username === "" ?
                  <div class="row">
                    <div class="alert success">
                      <p>Thanks for joining! Make sure to set your username and email address.</p>
                    </div>
                  </div>
                  : <span />
                }

                <img className="profile-image" src={'http:' + gravatarUrl} />
                <h2 className="profile-title">{artist.username}</h2>
              </div>

              <div className="row centre">
                <a href={'/artist/' + this.props.auth._id + '/tracks'}
                   className="blue lighten-2 waves-effect waves-light btn-large">
                  <i className="fas fa-play btn-far"></i> TRACKS
                </a>
                <a href="#" onClick={this.copyShareLink}
                   className="blue lighten-2 waves-effect waves-light btn-large">
                  <i className="fas fa-share btn-far"></i> SHARE
                </a>
                <a href={'/artist/' + this.props.auth._id + '/likes'}
                   className="blue lighten-2 waves-effect waves-light btn-large">
                  <i className="fas fa-heart btn-far"></i> LIKES
                </a>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <div className="row">
                    <div className="highlight">

                      <div className="row profile-entry">
                        <p className="profile-label">Username</p>
                        <div className="profile-data">
                          <Field
                                 name="username"
                                 className="input-data"
                                 component="input"
                                 type="text"
                                 value={this.props.auth.username}
                                 placeholder={this.props.auth.username}
                                 onChange={this.handleUsernameChange}
                                 />
                        </div>
                      </div>

                      <div className="row profile-entry">
                        <p className="profile-label">About Me</p>
                        <div className="profile-data">
                          <Field
                                 name="blurb"
                                 className="input-data"
                                 component="input"
                                 type="text"
                                 value={this.props.auth.blurb}
                                 placeholder={this.props.auth.blurb}
                                 onChange={this.handleBlurbChange}
                                 />
                        </div>
                      </div>

                      <div className="row profile-entry">
                        <p className="profile-label">Email</p>
                        <div className="profile-data">
                          <Field
                                 name="email"
                                 className="input-data"
                                 component="input"
                                 type="text"
                                 value={this.props.auth.email}
                                 placeholder={this.props.auth.email}
                                 onChange={this.handleEmailChange}
                                 />
                        </div>
                      </div>

                      <div className="row profile-entry">
                        <p className="profile-label">Genres</p>
                        <Field
                               multi={true}
                               name="genres"
                               onChange={this.handleGenresChange}
                               value={this.props.auth.genres}
                               options={genres}
                               component={RFReactSelect}
                               />
                      </div>

                      <div className="row profile-entry">
                        <p className="profile-label">Instruments</p>
                        <Field
                               multi={true}
                               name="instruments"
                               onChange={this.handleInstrumentsChange}
                               value={this.props.auth.instruments}
                               options={instruments}
                               component={RFReactSelect}
                               />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="green accent-3 waves-effect waves-light btn-large">
                  Submit
                </button>
              </form>

              {
                this.state.settingsSubmit ?
                <div class="row">
                  <div class="alert success">
                    <p>Your settings have been updated!</p>
                  </div>
                </div>
                : <span />
              }
            </div>
          </div>
        );
    }
  }

  /* Main Render Function */
  render() {
    return <div>{this.renderUserForm()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

const UserForm = reduxForm({
  form: "userForm"
})(Settings);

export default connect(mapStateToProps, actions)(withRouter(UserForm));
