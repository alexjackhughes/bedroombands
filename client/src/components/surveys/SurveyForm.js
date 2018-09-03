import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import _ from "lodash";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";

import AsyncSelect from "react-select/lib/Async";
import RFReactSelect from "../Settings/RFReactSelect";

import * as actions from "../../actions";

class SurveyForm extends Component {
  constructor() {
    super();

    this.state = {
      instruments: [
        "Guitar",
        "Bass",
        "Drums",
        "Vocals",
        "Piano",
        "Synth",
        "Production",
        "Other"
      ],
      genres: [
        "Rock",
        "Indie",
        "Metal",
        "Pop",
        "R&B",
        "Hip Hop",
        "Jazz",
        "Classical",
        "World",
        "Blues",
        "Acoustic",
        "Electronic",
        "Other"
      ],
      artists: [{ value: "hello", label: "me" }]
    };

    this.handleArtistsChange = this.handleArtistsChange.bind(this);
    this.handleGenresChange = this.handleGenresChange.bind(this);
    this.handleInstrumentsChange = this.handleInstrumentsChange.bind(this);
  }

  getUsers() {
    let usersArray = [];
    axios.get("/api/users").then(users => {
      console.log("All the users", users);

      users.data.map(user => {
        usersArray.push({ value: user._id, label: user.username });
      });
    });

    return usersArray;
  }

  handleArtistsChange(values) {
    console.log(values);
    this.setState({ artists: values });
  }

  handleGenresChange(values) {
    console.log(values);
    this.setState({ genres: values });
  }

  handleInstrumentsChange(values) {
    console.log(values);
    this.setState({ instruments: values });
  }

  renderFields() {
    return _.map(FIELDS, field => {
      return (
        <Field
          label={field.label}
          type="text"
          name={field.name}
          key={field.name}
          component={SurveyField}
          className="input-data"
        />
      );
    });
  }

  render() {
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

    const artists = this.getUsers();

    switch (
      this.props.auth &&
        this.state &&
        this.state.artists &&
        this.state.genres &&
        this.state.instruments
    ) {
      case null:
        return <div />;

      case false:
        return <Redirect to="/" />;

      default:
        return (
          <div className="row">
            <div className="col s6 offset-s3 form-mobile">
              <h1 className="profile-title centre">Add Track</h1>
              <form
                onSubmit={this.props.handleSubmit(() =>
                  this.props.onSurveySubmit()
                )}
              >
                <div className="row">
                  <div className="highlight">
                    <div className="row profile-entry">
                      <p className="profile-label">Titles</p>
                      <div className="profile-data">
                        <Field
                          name="title"
                          component="input"
                          type="text"
                          className="input-data"
                        />
                      </div>
                    </div>

                    <div className="row profile-entry">
                      <p className="profile-label">SoundCloud URL</p>
                      <div className="profile-data">
                        <Field
                          name="soundCloudUrl"
                          component="input"
                          type="text"
                          className="input-data"
                        />
                      </div>
                    </div>

                    <div className="row profile-entry">
                      <p className="profile-label">Description</p>
                      <div className="profile-data">
                        <Field
                          name="description"
                          component="input"
                          type="text"
                          className="input-data"
                        />
                      </div>
                    </div>

                    <p className="profile-label">Artists</p>
                    <Field
                      multi={true}
                      name="artists"
                      onChange={this.handleArtistsChange}
                      value={this.state.artists}
                      options={artists}
                      component={RFReactSelect}
                    />

                    <p className="profile-label">Genres</p>
                    <Field
                      multi={true}
                      name="genres"
                      onChange={this.handleGenresChange}
                      value={this.state.genres}
                      options={genres}
                      component={RFReactSelect}
                    />

                    <p className="profile-label">Instruments</p>
                    <Field
                      multi={true}
                      name="instruments"
                      onChange={this.handleInstrumentsChange}
                      value={this.state.instruments}
                      options={instruments}
                      component={RFReactSelect}
                    />

                    <Link
                      to="/tracks"
                      className="red accent-3 waves-effect waves-light btn-large"
                    >
                      Cancel <i className="fas fa-times-circle btn-far" />
                    </Link>
                    <button
                      type="submit"
                      className="green accent-3 waves-effect waves-light btn-large right"
                    >
                      Next <i className="fas fa-save btn-far" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
    }
  }
}

function validate(values) {
  const errors = {};

  // Check emails are valid
  errors.emails = validateEmails(values.recipients || "");

  // Make sure all fields are filled in
  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

const TrackForm = reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(TrackForm));
