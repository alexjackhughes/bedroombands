import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

class Sidebar extends Component {
  render() {
    switch (this.props.auth) {
      case null:

      case false:
        return <Redirect to="/" />;

      default:
        return (
          <div>
            <div>
              {
                // <Link to={"/artist/" + this.props.id + "/featured"}>
                //   <p className="sidebar-item">
                //     <i className="far fa-star sidebar-icon featured-icon" />
                //     <span className="sidebar-text">Featured</span>
                //   </p>
                // </Link>
              }
              <Link to={"/artist/" + this.props.id + "/liked"}>
                <p className="sidebar-item">
                  <i className="far fa-heart sidebar-icon favourite-icon" />
                  <span className="sidebar-text">My Likes</span>
                </p>
              </Link>
              <Link to={"/artist/" + this.props.id + "/tracks"}>
                <p className="sidebar-item">
                  <i className="fas fa-list sidebar-icon tracks-icon" />
                  <span className="sidebar-text">My Tracks</span>
                </p>
              </Link>
              <hr className="sidebar-line" />
              <Link to={"/tracks/artists"}>
                <p className="sidebar-item">
                  <i className="fas fa-headphones sidebar-icon lfg-icon" />
                  <span className="sidebar-text">LFG</span>
                </p>
              </Link>
              <Link to={"/tracks/progress"}>
                <p className="sidebar-item">
                  <i className="fas fa-tasks sidebar-icon progress-icon" />
                  <span className="sidebar-text">In Progress</span>
                </p>
              </Link>
              <Link to={"/tracks/complete"}>
                <p className="sidebar-item">
                  <i className="fas fa-check sidebar-icon complete-icon" />
                  <span className="sidebar-text">Complete</span>
                </p>
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

export default connect(mapStateToProps)(Sidebar);
