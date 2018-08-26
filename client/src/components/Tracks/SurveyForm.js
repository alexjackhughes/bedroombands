import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import _ from "lodash";
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, field => {
      return (
        <Field
          label={field.label}
          type="text"
          name={field.name}
          key={field.name}
          component={SurveyField}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Add A Track</h1>
        <form
          onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
        >
          {/* Much easier way to do fields  <Field type="text" name="surveyTitle" component="input" /> */}
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next<i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
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

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
