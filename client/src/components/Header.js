import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <li className="right">
            <a href="/auth/google" className="blue lighten-2 waves-effect waves-light btn-large nav-button-margin">
              Login
            </a>

          </li>
        );

      default:
        return [
          <li key="3" className="right">
            <a href="/api/logout" className="black-text">
              Logout
            </a>
          </li>,
          <li key="4">
            <Link to="/settings" className="right black-text">
              My Profile
            </Link>
          </li>,
          <li key="5">
            <Link to="/tracks" className="right black-text">
              Tracks
            </Link>
          </li>,
          <li key="7" className="right black-text">
            <a
              href="http://reddit.com/r/bedroombands"
              target="_blank"
              className="black-text"
            >
              Community
            </a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav style={{ height: "80px" }}>
        <div className="nav-wrapper grey lighten-5 z-depth-0">
          <Link
            to={this.props.auth ? "/tracks" : "/"}
            className="left brand-logo"
          >
            <img
              src="/bedroom-bands-logo.png"
              alt="Bedroom Bands logo"
              style={{ height: "85px", width: "300px" }}
            />
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
