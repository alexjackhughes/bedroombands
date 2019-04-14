import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reduxForm, Field } from "redux-form";

import Sidebar from "./Sidebar";
import SurveyList from "./surveys/SurveyList";
import TrackList from "./TrackList";
import Intercom from "react-intercom";

class Dashboard extends Component {
  render() {
    const user = this.props.auth
      ? {
          user_id: this.props.auth._id,
          email: this.props.auth.email,
          name: this.props.auth.username
        }
      : null;

    switch (this.props.auth) {
      case null:

      case false:
        return <Redirect to="/" />;

      default:
        return (
          <div className="row margin-sizing">
            <div className="col s3 sidebar hide-sidebar-mobile">
              <Sidebar id={this.props.auth._id} />
            </div>

            <div className="col s8 main-track-section dashboard-mobile">
              <div className="row add-margin-mobile">
                <h1 className="page-title" style={{ textAlign: "center" }}>
                  All Tracks
                </h1>
                <TrackList />
              </div>
              <Intercom appID="pphqr028" {...user} />
              <Link to="/upload/track">
                <i className="fas fa-plus-circle upload-track" />
              </Link>
            </div>
          </div>
        );
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);
