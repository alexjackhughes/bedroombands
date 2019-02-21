import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import AsyncSelect from "react-select/lib/Async";
import { Redirect, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";

import _ from "lodash";
import axios from "axios";
import gravatar from "gravatar";

import * as actions from "../../actions";

class UploadTrack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      type: "progress",
      soundCloudUrl: "",
      description: "",
      artists: [],
      ratings: [],
      genres: [],
      users: [],
      instruments: [],
      currentRating: 0,
      titleValid: false,
      soundCloudUrlValid: false,
      descriptionValid: false,
      genresValid: true,
      typeValid: false,
      instrumentsValid: true,
      errorMessage: "You have added too many!"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  getUsers() {
    let usersArray = [];
    axios.get("/api/users").then(users => {
      users.data.map(user => {
        usersArray.push({ value: user._id, label: user.username });
      });
    });

    return usersArray;
  }

  handleSubmit(event) {
    event.preventDefault();

    if (
      !this.state.title ||
      !this.state.soundCloudUrl ||
      !this.state.description ||
      !this.state.instruments === [] ||
      !this.state.genres === []
    ) {
      this.setState({
        instrumentsValid: false,
        errorMessage: "Make sure you've filled all the fields, you silly goose."
      });
      return;
    }

    let genres = this.state.genres;
    let genresData = genres.map(genre => {
      return genre.value;
    });

    let instruments = this.state.instruments;
    let instrumentsData = instruments.map(instrument => {
      return instrument.value;
    });

    let artists = this.state.artists.map(artist => {
      return artist.value;
    });
    artists.push(this.props.auth._id);

    const artistSet = new Set([...artists]);
    const artistsData = [...artistSet];

    let data = {
      title: this.state.title,
      soundCloudUrl: this.state.soundCloudUrl,
      description: this.state.description,
      artists: artistsData,
      type: this.state.type,
      genres: genresData,
      instruments: instrumentsData
    };

    axios.post("/api/track", data).then(data => {
      console.log("track created", data);
      this.props.history.push("/"); // should re-direct the user
    });
  }

  handleTextChange(event) {
    console.log(event.target.name, event.target.value);

    if (event.target.value.length > 30 || event.target.value.length === 0) {
      this.setState({
        titleValid: false,
        titleErrorMessage: `The ${[
          event.target.name
        ]} must not be left blank, or be more than 30 characters!`
      });
      return;
    }
    this.setState({
      titleValid: true,
      [event.target.name]: event.target.value
    });
  }

  handleSoundCloudUrlChange(event) {
    let exampleTrack = event.target.value;
    let re = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;

    if (
      !exampleTrack.match(re) ||
      !exampleTrack.match(re)[2] ||
      event.target.value.length === 0
    ) {
      this.setState({
        soundCloudUrlValid: false,
        soundCloudUrlErrorMessage: "This is not a valid SoundCloud URL"
      });
      return;
    } else {
      this.setState({ soundCloudUrlValid: true });
    }

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDescriptionChange(event) {
    if (event.target.value.length > 240 || event.target.value.length === 0) {
      this.setState({
        descriptionValid: false,
        descriptionErrorMessage: `The ${[
          event.target.name
        ]} must not be left blank, or be more than 240 characters`
      });
      return;
    }
    this.setState({
      descriptionValid: true,
      [event.target.name]: event.target.value
    });
  }

  handleSingleSelectChange(event) {
    this.setState({
      typeValid: true,
      type: event.value
    });
  }

  handleArtistsChange(values) {
    console.log("artists", values);
    this.setState({ artists: values });
  }

  handleGenresChange(values) {
    if (values.length >= 5) {
      this.setState({ genresValid: false });
      return;
    }
    this.setState({ genresValid: true, genres: values });
  }

  handleInstrumentsChange(values) {
    if (values.length >= 6) {
      this.setState({ instrumentsValid: false });
      return;
    }
    this.setState({ instrumentsValid: true, instruments: values });
  }

  render() {
    console.log("users", this.state.users);

    const progress = [
      { value: "artists", label: "Need Artists" },
      { value: "progress", label: "In Progress" },
      { value: "complete", label: "Complete" }
    ];

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

    console.log("genres", this.state.genres, genres);

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

    const artists = this.getUsers();

    if (!this.props.auth) {
      return <Redirect to="/" />;
    }

    return (
      <div className="row" style={{ textAlign: "center" }}>
        <h1 className="profile-title centre">Add Track</h1>
        <div className="col s6 offset-s3 form-mobile">
          <div className="row centre">
            <form onSubmit={this.handleSubmit}>
              <div>
                <div className="row">
                  <div className="highlight">
                    <div className="row profile-entry">
                      <p className="profile-label">Title</p>
                      <div className="profile-data">
                        <Field
                          name="title"
                          className="input-data"
                          component="input"
                          type="text"
                          value={this.state.title}
                          placeholder={this.state.title}
                          onChange={this.handleTextChange.bind(this)}
                        />
                      </div>
                      {this.state.titleValid ? (
                        ""
                      ) : (
                        <p className="valid-input">
                          {this.state.titleErrorMessage}
                        </p>
                      )}
                    </div>
                    <div className="row profile-entry">
                      <p className="profile-label">SoundCloud URL</p>
                      <div className="profile-data">
                        <Field
                          name="soundCloudUrl"
                          className="input-data"
                          component="input"
                          type="text"
                          value={this.state.soundCloudUrl}
                          placeholder={"Must be a valid SoundCloud URL"}
                          onChange={this.handleSoundCloudUrlChange.bind(this)}
                        />
                      </div>
                      {this.state.soundCloudUrlValid ? (
                        ""
                      ) : (
                        <p className="valid-input">
                          {this.state.soundCloudUrlErrorMessage}
                        </p>
                      )}
                    </div>
                    <div className="row profile-entry">
                      <p className="profile-label">Description</p>
                      <div className="profile-data">
                        <Field
                          name="description"
                          className="input-data"
                          component="input"
                          type="text"
                          value={this.state.description}
                          placeholder={this.state.description}
                          onChange={this.handleDescriptionChange.bind(this)}
                        />
                      </div>
                      {this.state.descriptionValid ? (
                        ""
                      ) : (
                        <p className="valid-input">
                          {this.state.descriptionErrorMessage}
                        </p>
                      )}
                    </div>
                    {this.state && this.state.users ? (
                      <div className="row profile-entry margin-bottom">
                        <p className="profile-label">Artists</p>
                        <Select
                          value={this.state.artists}
                          className="input-field"
                          onChange={this.handleArtistsChange.bind(this)}
                          options={artists}
                          isMulti={true}
                        />
                      </div>
                    ) : null}
                    <div className="row profile-entry margin-bottom">
                      <p className="profile-label">Progress</p>
                      <Select
                        value={this.state.progress}
                        className="input-field"
                        onChange={this.handleSingleSelectChange.bind(this)}
                        options={progress}
                        isMulti={false}
                      />
                    </div>
                    <div className="row profile-entry margin-bottom">
                      <p className="profile-label">Genres</p>
                      <Select
                        value={this.state.genres}
                        className="input-field"
                        onChange={this.handleGenresChange.bind(this)}
                        options={genres}
                        isMulti={true}
                      />
                      {this.state.genresValid ? (
                        ""
                      ) : (
                        <p className="valid-input">{this.state.errorMessage}</p>
                      )}
                    </div>
                    <div className="row profile-entry margin-bottom">
                      <p className="profile-label">Instruments</p>
                      <Select
                        value={this.state.instruments}
                        className="input-field"
                        onChange={this.handleInstrumentsChange.bind(this)}
                        options={instruments}
                        isMulti={true}
                      />
                      {this.state.instrumentsValid ? (
                        ""
                      ) : (
                        <p className="valid-input">{this.state.errorMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "left" }}>
                <Link
                  to="/tracks"
                  className="behind-button red accent-3 waves-effect waves-light btn-large"
                >
                  Cancel <i className="fas fa-times-circle btn-far" />
                </Link>
                <button
                  type="submit"
                  className="behind-button green accent-3 waves-effect waves-light btn-large right"
                  disabled={
                    !this.state.titleValid ||
                    !this.state.soundCloudUrlValid ||
                    !this.state.descriptionValid ||
                    !this.state.typeValid ||
                    !this.state.genresValid ||
                    !this.state.instrumentsValid
                  }
                >
                  Submit <i className="fas fa-save btn-far" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

const TrackForm = reduxForm({
  form: "userForm"
})(UploadTrack);

export default connect(
  mapStateToProps,
  actions
)(withRouter(TrackForm));
