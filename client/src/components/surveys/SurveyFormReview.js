import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import _ from "lodash";

import FIELDS from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitTrack, history }) => {

  const reviewFields = _.map(FIELDS, ({ name, label }) => {
    return (
      <div key={name} className="row profile-entry">
        <p className="profile-label">{label}</p>
        <p className="profile-data">{formValues[name]}</p>
      </div>
    );
  });

  switch(formValues) {
    case null:
      return <div />;

    case false:
      return <Redirect to="/" />;

    default:
    return (
      <div className="row">
        <div className="col s6 offset-s3">
          <h2 className="profile-title centre">Confirm Track</h2>
          <div className="highlight">
            <span>{reviewFields}</span>
            <button className="red accent-3 waves-effect waves-light btn-large" onClick={onCancel}>
              Back <i className="fas fa-times-circle btn-far"></i>
            </button>
            <button
              className="green accent-3 waves-effect waves-light btn-large right"
              onClick={() => {
                submitTrack(formValues, history);
              }}
            >
              Are You Sure? <i className="fas fa-save btn-far"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
