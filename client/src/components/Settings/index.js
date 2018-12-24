import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";

import ProfileDetail from "./profileDetail";

import _ from "lodash";
import axios from "axios";
import gravatar from "gravatar";

import * as actions from "../../actions";
import RFReactSelect from "./RFReactSelect";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
      usernameValid: true,
      blurbValid: true,
      emailValid: true,
      soundcloudUrlValid: true,
      genresValid: true,
      instrumentsValid: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleBlurbChange = this.handleBlurbChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleExampleTrackChange = this.handleExampleTrackChange.bind(this);
    this.handleGenresChange = this.handleGenresChange.bind(this);
    this.handleInstrumentsChange = this.handleInstrumentsChange.bind(this);
    this.setUserDefaults = this.setUserDefaults.bind(this);
  }

  componentDidMount() {
    this.setState({
      settingsSubmit: false
    });
  }

  /*
    Takes the current URL and adds it
    to the user's clipboard and sets an alert
   */
  copyShareLink() {
    let copyText = document.createElement("textarea");
    copyText.value = "https://bedroombands.com/" + this.props.auth.id;
    copyText.setAttribute("readonly", "");
    copyText.style = { position: "absolute", left: "-9999px" };

    document.body.appendChild(copyText);
    copyText.select();

    document.execCommand("Copy");
    alert("Copied the link!");
  }

  /* Event Handlers */

  handleUsernameChange(event) {
    event.target.value = event.target.value
      .toLowerCase()
      .replace(/[^A-Z0-9]/gi, "");

    if (event.target.value.length > 21) {
      this.setState({ usernameValid: false });
    } else {
      this.setState({ usernameValid: true, username: event.target.value });
    }
  }

  handleBlurbChange(event) {
    if (event.target.value.length > 121) {
      this.setState({ blurbValid: false });
    } else {
      this.setState({ blurbValid: true, blurb: event.target.value });
    }
  }

  handleEmailChange(event) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = String(event.target.value).toLowerCase();

    if (!re.test(email)) {
      this.setState({ emailValid: false });
    } else {
      this.setState({ emailValid: true });
    }

    this.setState({ email });
  }

  handleExampleTrackChange(event) {
    let exampleTrack = event.target.value;
    let re = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;

    if (!exampleTrack.match(re) || !exampleTrack.match(re)[2]) {
      this.setState({ soundcloudUrlValid: false });
    } else {
      this.setState({ soundcloudUrlValid: true });
    }

    this.setState({ exampleTrack: event.target.value });
  }

  handleGenresChange(values) {
    if (values.length > 5) {
      this.setState({ genresValid: false });
    } else {
      this.setState({ genresValid: true });
    }

    this.setState({ genres: values });
  }

  handleInstrumentsChange(values) {
    if (values.length > 5) {
      this.setState({ instrumentsValid: false });
    } else {
      this.setState({ instrumentsValid: true });
    }

    this.setState({ instruments: values });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.username) {
      this.state.username = this.state.username
        .toLowerCase()
        .replace(/\s/g, "");
    } else if (!this.state.username) {
      this.state.username = this.props.auth.username;
    } else if (this.state.username.length > 15) {
      this.setState({ errorMessage: "Your username is too long!" });
      return;
    }

    if (!this.state.email) {
      this.state.email = this.props.auth.email;
    }

    if (!this.state.blurb) {
      this.state.blurb = this.props.auth.blurb;
    } else if (this.state.blurb.length > 320) {
      this.setState({ errorMessage: "Your 'About Me' is too long!" });
      return;
    }

    if (!this.state.genres) {
      this.state.genres = this.props.auth.genres;
    } else if (this.state.genres.length > 5) {
      this.setState({ errorMessage: "You need to select less genres" });
      return;
    } else {
      this.state.genres = this.state.genres.map(item => {
        return item.value;
      });
    }

    if (!this.state.exampleTrack) {
      this.state.exampleTrack = this.props.auth.exampleTrack;
    } else if (!this.state.exampleTrack.includes("soundcloud")) {
      this.setState({
        errorMessage: "You need to provide a valid SoundCloud URL of your track"
      });
      return;
    }

    if (!this.state.instruments) {
      this.state.instruments = this.props.auth.instruments;
    } else if (this.state.instruments.length > 5) {
      this.setState({ errorMessage: "You need to select less instruments" });
      return;
    } else {
      this.state.instruments = this.state.instruments.map(item => {
        return item.value;
      });
    }

    if (!this.state.likedTracks) {
      this.state.likedTracks = this.props.auth.likedTracks;
    }

    if (!this.state.myTracks) {
      this.state.myTracks = this.props.auth.myTracks;
    }

    axios.put("/api/current_user", this.state)
    .then(data => {
      window.location.reload();
    })
    .catch((error) => {
      console.log("error", error);
      this.setState({
        errorMessage: "This email is already in use!"
      });
    });
  }

  /* Render Components */

  setUserDefaults(genres, instruments) {
    this.setState({
      genres,
      instruments
    });
  }

  renderUserForm() {
    const genres = [
      { value: "Rock", label: "Rock" },
      { value: "Indie", label: "Indie" },
      { value: "Metal", label: "Metal" },
      { value: "Pop", label: "Pop" },
      { value: "R&B", label: "R&B" },
      { value: "Hip-Hop", label: "Hip-Hop" },
      { value: "Jazz", label: "Jazz" },
      { value: "Classical", label: "Classical" },
      { value: "World", label: "World" },
      { value: "Blues", label: "Blues" },
      { value: "Acoustic", label: "Acoustic" },
      { value: "Electronic", label: "Electronic" },
      { value: "Other", label: "Other" }
    ];

    const instruments = [
      { value: "Guitar", label: "Guitar" },
      { value: "Bass", label: "Bass" },
      { value: "Drums", label: "Drums" },
      { value: "Vocals", label: "Vocals" },
      { value: "Piano", label: "Piano" },
      { value: "Synth", label: "Synth" },
      { value: "Production", label: "Production" },
      { value: "Accordion", label: "Accordion" },
      { value: "Bandola", label: "Bandola" },
      { value: "Other", label: "Other" }
    ];

    switch (
      this.props &&
        this.props.auth &&
        this.props.auth.genres &&
        this.state &&
        this.state.genres &&
        this.state.errorMessage &&
        this.state.settingsSubmit !== undefined
    ) {
      case null:
        return <div>Loading...</div>;

      case false:
        return <Redirect to="/" />;

      default:
        let artist = this.props.auth;
        let gravatarUrl = gravatar.url(artist.email, { s: "400" });

        let genreDefaultValues = [];
        this.props.auth.genres.map(genre => {
          genreDefaultValues.push({ label: genre, value: genre });
        });

        let instrumentDefaultValues = [];
        this.props.auth.instruments.map(instrument => {
          instrumentDefaultValues.push({
            label: instrument,
            value: instrument
          });
        });

        return (
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col s6 offset-s3 form-mobile">
              <div className="row centre">
                {/* New user walkthrough */}
                {artist.username === "" ? (
                  <div className="row">
                    <div className="alert success">
                      <p>
                        Thanks for joining! Make sure to set your details below :)
                      </p>
                    </div>
                  </div>
                ) : (
                  <span />
                )}
              </div>

              <ProfileDetail
                id={this.props.auth._id}
                username={artist.username}
                gravatarUrl={gravatarUrl}
              />

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
                      {this.state.usernameValid ? (
                        ""
                      ) : (
                        <p className="valid-input">
                          Usernames must be less than 20 characters
                        </p>
                      )}

                      <div className="row profile-entry">
                        <p className="profile-label">About Me</p>
                        <div className="profile-data">
                          <Field
                            name="blurb"
                            className="input-data"
                            component="input"
                            type="text"
                            contentEditable="true"
                            value={this.props.auth.blurb}
                            placeholder={this.props.auth.blurb}
                            onChange={this.handleBlurbChange}
                          />
                        </div>
                      </div>
                      {this.state.blurbValid ? (
                        ""
                      ) : (
                        <p className="valid-input">
                          About Me must be less than 120 characters
                        </p>
                      )}

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
                      {this.state.emailValid ? (
                        ""
                      ) : (
                        <p className="valid-input">Must be a valid email</p>
                      )}

                      <div className="row profile-entry">
                        <p className="profile-label">Example Track</p>
                        <div className="profile-data">
                          <Field
                            name="exampleTrack"
                            className="input-data"
                            component="input"
                            type="text"
                            value={this.props.auth.exampleTrack}
                            placeholder={this.props.auth.exampleTrack}
                            onChange={this.handleExampleTrackChange}
                          />
                        </div>
                      </div>
                      {this.state.soundcloudUrlValid ? (
                        ""
                      ) : (
                        <p className="valid-input">
                          The link must be a valid SoundCloud URL for the track
                          to be visible on your profile.
                        </p>
                      )}
                      <div className="row profile-entry">
                        <p className="profile-label">Genres</p>
                        <Select
                          value={this.state.genres || genreDefaultValues}
                          className="input-field"
                          onChange={this.handleGenresChange}
                          options={genres}
                          isMulti={true}
                        />
                      </div>
                      {this.state.genresValid ? (
                        ""
                      ) : (
                        <p className="valid-input">Maximum of five genres</p>
                      )}

                      <div className="row profile-entry margin-bottom">
                        <p className="profile-label">Instruments</p>
                        <Select
                          value={
                            this.state.instruments || instrumentDefaultValues
                          }
                          className="input-field"
                          onChange={this.handleInstrumentsChange}
                          options={instruments}
                          isMulti={true}
                        />
                      </div>
                      {this.state.instrumentsValid ? (
                        ""
                      ) : (
                        <p className="valid-input">
                          Maximum of five instruments
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className="behind-button green accent-3 waves-effect waves-light btn-large"
                    disabled={
                      !this.state.soundcloudUrlValid ||
                      !this.state.usernameValid ||
                      !this.state.blurbValid ||
                      !this.state.emailValid ||
                      !this.state.genresValid ||
                      !this.state.instrumentsValid
                    }
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {/* Displays Error Message */}
              {this.state.errorMessage !== "" ? (
                <div className="row">
                  <div className="alert failure">
                    <p>{this.state.errorMessage}</p>
                  </div>
                </div>
              ) : (
                <span />
              )}

              <Link to="/upload/track">
                <i className="fas fa-plus-circle upload-track" />
              </Link>

              {this.state.settingsSubmit ? (
                <div className="row">
                  <div className="alert success">
                    <p>Your settings have been updated!</p>
                  </div>
                </div>
              ) : (
                <span />
              )}
            </div>
          </div>
        );
    }
  }

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

export default connect(
  mapStateToProps,
  actions
)(withRouter(UserForm));
