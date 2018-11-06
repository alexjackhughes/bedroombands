import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import _ from "lodash";
import axios from "axios";
import gravatar from "gravatar";

import * as actions from "../../actions";
import RFReactSelect from "./RFReactSelect";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleBlurbChange = this.handleBlurbChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleExampleTrackChange = this.handleExampleTrackChange.bind(this);
    this.handleGenresChange = this.handleGenresChange.bind(this);
    this.handleInstrumentsChange = this.handleInstrumentsChange.bind(this);
  }

  componentDidMount() {
    console.log("props", this.props);

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
    copyText.value =
      "https://bedroombands.com/" + this.props.auth.id;
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

    this.setState({ username: event.target.value });
  }

  handleBlurbChange(event) {
    this.setState({ blurb: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleExampleTrackChange(event) {
    this.setState({ exampleTrack: event.target.value });
  }

  handleGenresChange(values) {
    this.setState({ genres: values });
  }

  handleInstrumentsChange(values) {
    this.setState({ instruments: values });
  }

  /*
  Could have very simply have some error tracking here
  by saving the state to true of an error message
  and then also setting it to a message like "Username is too long"
  and then returning null;
   */
  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.username) {
      this.state.username = this.props.auth.username;
    } else if(this.state.username.length > 15) {
      this.setState({errorMessage: "Your username is too long!"});
      return;
    }

    this.state.username = this.state.username.toLowerCase().replace(/\s/g, '');

    if (!this.state.email) {
      this.state.email = this.props.auth.email;
    }

    if (!this.state.blurb) {
      this.state.blurb = this.props.auth.blurb;
    } else if(this.state.blurb.length > 320) {
      this.setState({errorMessage: "Your 'About Me' is too long!"});
    }

    if (!this.state.genres) {
      this.state.genres = this.props.auth.genres;
    } else if(this.state.genres.length > 4) {
      this.setState({errorMessage: "You need to select less genres"});
      return;
    }

    if (!this.state.exampleTrack) {
      this.state.exampleTrack = this.props.auth.exampleTrack;
    } else if(!this.state.exampleTrack.includes('soundcloud')) {
      this.setState({errorMessage: "You need to provide a valid SoundCloud URL of your track"});
      return;
    }

    if (!this.state.instruments) {
      this.state.instruments = this.props.auth.instruments;
    } else if(this.state.instruments.length > 4) {
      this.setState({errorMessage: "You need to select less instruments"});
      return;
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

    this.setState({ settingsSubmit: true });
    //window.location.reload();
    //actions.submitUser(this.state, this.props.history);
  }

  /* Render Components */

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
        this.state &&
        this.state.errorMessage &&
        this.state.settingsSubmit !== undefined
    ) {
      case null:
        return <div>Loading...</div>;

      case false:
        return <Redirect to="/" />;

      default:
        console.log("auth", this.props.auth);
        let artist = this.props.auth;
        let gravatarUrl = gravatar.url(artist.email, { s: "400" }); // Might need to remove options
        return (
          <div className="row" style={{ textAlign: "center" }}>
            <div className="row centre">
              {artist.username === "" ? (
                <div class="row">
                  <div class="alert success">
                    <p>
                      Thanks for joining! Make sure to set your username and
                      email address.
                    </p>
                  </div>
                </div>
              ) : (
                <span />
              )}
            </div>
            <div className="col s6 offset-s3 form-mobile">
              <div className="row">
                <img className="profile-image" src={"http:" + gravatarUrl} />
                <h2 className="profile-title">{artist.username}</h2>
              </div>

              <div className="row centre">
                <a
                  href={"/artist/" + this.props.auth._id + "/tracks"}
                  className="blue lighten-2 waves-effect waves-light btn-large"
                >
                  <i className="fas fa-play btn-far" /> TRACKS
                </a>
                <a
                  href={"/artist/" + this.props.auth._id + "/likes"}
                  className="blue lighten-2 waves-effect waves-light btn-large"
                >
                  <i className="fas fa-heart btn-far" /> LIKES
                </a>
              </div>

              {
                this.state.errorMessage !== "" ?
                <div class="row">
                  <div class="alert failure">
                    <p>{this.state.errorMessage}</p>
                  </div>
                </div>
                : <span />
              }

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
                        <p className="profile-label" style={{'font-style': 'italic', 'padding-bottom':'20px', 'padding-right':'20px'}}>The link must be a valid SoundCloud URL for the track to be visible.</p>
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
                    <Link to="/upload/track">
                      <i className="fas fa-plus-circle upload-track" />
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  className="green accent-3 waves-effect waves-light btn-large"
                >
                  Submit
                </button>
              </form>

              {this.state.settingsSubmit ? (
                <div class="row">
                  <div class="alert success">
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

export default connect(
  mapStateToProps,
  actions
)(withRouter(UserForm));
