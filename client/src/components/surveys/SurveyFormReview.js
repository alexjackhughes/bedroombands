import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";

import FIELDS from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitTrack, history }) => {

  const reviewFields = _.map(FIELDS, ({ name, label }) => {
    return (
      <div class="row profile-entry">
        <p class="profile-label">{label}</p>
        <p class="profile-data">{formValues[name]}</p>
      </div>
    );
  });

  return (
    <div class="row">
      <div class="col s6 offset-s3">
        <h2 class="profile-title centre">Confirm Track</h2>
        <div class="highlight">
          <span>{reviewFields}</span>
          <button className="red accent-3 waves-effect waves-light btn-large" onClick={onCancel}>
            Back <i class="fas fa-times-circle btn-far"></i>
          </button>
          <button
            className="green accent-3 waves-effect waves-light btn-large right"
            onClick={() => {
              submitTrack(formValues, history);
            }}
          >
            Are You Sure? <i class="fas fa-save btn-far"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
