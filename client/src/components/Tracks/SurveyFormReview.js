import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";

import FIELDS from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitTrack, history }) => {

  const reviewFields = _.map(FIELDS, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div class="row">
      <div class="highlight">
        <div>{reviewFields}</div>
        <button className="yellow darken-3 btn-flat" onClick={onCancel}>
          Back
        </button>
        <button
          className="green darken-3 btn-flat right"
          onClick={() => {
            submitTrack(formValues, history);
          }}
        >
          Are You Sure?
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
