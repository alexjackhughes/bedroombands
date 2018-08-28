import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reduxForm, Field } from "redux-form";

import Sidebar from "./Sidebar";
import SurveyList from "./surveys/SurveyList";
import TrackList from "./TrackList";

import "./Dashboard.css";

/*
<div>
  <TrackList />
  <div classNameName="fixed-action-btn">
    <Link to="/tracks/new">
      <i classNameName="fas fa-plus-circle upload-track"></i>
    </Link>
  </div>
</div>
 */

class Dashboard extends Component {

  render() {
    switch(this.props.auth) {
      case null:

      case false:
        return <Redirect to="/" />;

      default:
        return (
        <div className="row margin-sizing">
          <div className="col s3 sidebar">
            <Sidebar id={this.props.auth._id} />
          </div>

          <div className="col s8 main-track-section">
            <div className="row">
              <TrackList />
            </div>
            <Link to="/tracks/new">
              <i className="fas fa-plus-circle upload-track"></i>
            </Link>
          </div>
        </div>
      );
    }
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);
