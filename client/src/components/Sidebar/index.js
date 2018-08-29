import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

class Sidebar extends Component {

  render() {
      switch(this.props.auth) {
        case null:

        case false:
          return <Redirect to="/" />;

    default:
    return(
      <div>
        <Link to={'/artist/' + this.props.id + '/liked'} style={{'color':'#2B3854'}}>
          <p className="category-item"><i className="far fa-heart category-icon like-icon"></i><span className="category-text">Liked Tracks</span></p>
        </Link>

        <Link to={'/artist/' + this.props.id + '/tracks'} style={{'color':'#2B3854'}}>
          <p className="category-item"><i className="fas fa-list category-icon track-icon"></i><span className="category-text">My Tracks</span></p>
        </Link>

        <hr className="category-line" />

        <Link to={'/tracks/progress'} style={{'color':'#2B3854'}}>
        <p className="category-item"><i className="fas fa-tasks category-icon collab-icon"></i><span className="category-text">In Progress</span></p>
        </Link>
        <Link to={'/tracks/completed'} style={{'color':'#2B3854'}}>
        <p className="category-item"><i className="fas fa-check category-icon complete-icon"></i><span className="category-text">Complete</span></p>
        </Link>

        <hr className="category-line" />

        <Link to={'/tracks/rating/5'} style={{'color':'#2B3854'}}>
        <p className="category-item">
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="fas fa-star category-icon rating-icon"></i>
        </p>
        </Link>

        <Link to={'/tracks/rating/4'} style={{'color':'#2B3854'}}>
        <p className="category-item">
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="far fa-star category-icon rating-icon"></i>
        </p>
        </Link>

        <Link to={'/tracks/rating/3'} style={{'color':'#2B3854'}}>
        <p className="category-item">
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="far fa-star category-icon rating-icon"></i>
          <i className="far fa-star category-icon rating-icon"></i>
        </p>
        </Link>

        <Link to={'/tracks/rating/2'} style={{'color':'#2B3854'}}>
        <p className="category-item">
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="far fa-star category-icon rating-icon"></i>
          <i className="far fa-star category-icon rating-icon"></i>
        </p>
        </Link>

        <Link to={'/tracks/rating/1'} style={{'color':'#2B3854'}}>
        <p className="category-item">
          <i className="fas fa-star category-icon rating-icon"></i>
          <i className="far fa-star category-icon rating-icon"></i>
          <i className="far fa-star category-icon rating-icon"></i>
          <i className="far fa-star category-icon rating-icon"></i>
          <i className="far fa-star category-icon rating-icon"></i>
        </p>
        </Link>
      </div>
    );
  }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Sidebar);
