import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reduxForm, Field } from "redux-form";

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

    if(this.props && this.props.auth) {
      console.log('props', this.props.auth);

      return (
        <div className="row margin-sizing">
          <div className="col s3 sidebar fixedsidebar">

            <Link to={'/artist/' + this.props.auth._id + '/liked'} style={{'color':'#2B3854'}}>
              <p className="category-item"><i className="far fa-heart category-icon like-icon"></i><span className="category-text">Liked Tracks</span></p>
            </Link>

            <Link to={'/artist/' + this.props.auth._id + '/tracks'} style={{'color':'#2B3854'}}>
              <p className="category-item"><i className="fas fa-list category-icon track-icon"></i><span className="category-text">My Tracks</span></p>
            </Link>

            <hr className="category-line" />

            <p className="category-item"><i className="fas fa-headphones category-icon solo-icon"></i><span className="category-text">Solo</span></p>
            <p className="category-item"><i className="fas fa-tasks category-icon collab-icon"></i><span className="category-text">In Progress</span></p>
            <p className="category-item"><i className="fas fa-check category-icon complete-icon"></i><span className="category-text">Complete</span></p>
            <hr className="category-line" />

            <p className="category-item">
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="fas fa-star category-icon rating-icon"></i>
            </p>

            <p className="category-item">
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="far fa-star category-icon rating-icon"></i>
            </p>

            <p className="category-item">
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="far fa-star category-icon rating-icon"></i>
              <i className="far fa-star category-icon rating-icon"></i>
            </p>

            <p className="category-item">
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="far fa-star category-icon rating-icon"></i>
              <i className="far fa-star category-icon rating-icon"></i>
              <i className="far fa-star category-icon rating-icon"></i>
            </p>

            <p className="category-item">
              <i className="fas fa-star category-icon rating-icon"></i>
              <i className="far fa-star category-icon rating-icon"></i>
              <i className="far fa-star category-icon rating-icon"></i>
              <i className="far fa-star category-icon rating-icon"></i>
              <i className="far fa-star category-icon rating-icon"></i>
            </p>
          </div>

          <div className="col s8 main-track-section">
            <div className="row tracklist">
              <TrackList />
            </div>
            <Link to="/tracks/new">
              <i className="fas fa-plus-circle upload-track"></i>
            </Link>
          </div>
        </div>
      );
    }
    return <div />;
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);
