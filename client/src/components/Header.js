import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      mobileMenu: false
    };
  }

  callMobileMenu() {
    this.setState({ mobileMenu: !this.state.mobileMenu });
    console.log("menu called", this.state.mobileMenu);
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <li className="right">
            <a href="/auth/google" className="nav-button">
              <span>SIGN UP</span>
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
          <li key="6">
            <a
              href="https://medium.com/bedroom-bands"
              className="right black-text"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
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
      <span>
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
            {this.props.auth ? (
              <div className="menu-section right">
                <span
                  onClick={() => this.callMobileMenu()}
                  className="fas fa-bars menu-icon"
                />
              </div>
            ) : (
              <span />
            )}
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
        <div className="row">
          {this.state.mobileMenu ? (
            <div className="col s8 side-menu">
              <div className="row">
                <Link to="/tracks" className="right mobile-menu-text">
                  Tracks
                </Link>
              </div>
              <div className="row">
                <Link to="/settings" className="right mobile-menu-text">
                  My Profile
                </Link>
              </div>
              <div className="row">
                <Link
                  to={"/artist/" + this.props.auth._id + "/liked"}
                  className="right mobile-menu-text"
                >
                  Liked Tracks
                </Link>
              </div>
              <div className="row">
                <Link
                  to={"/artist/" + this.props.auth._id + "/tracks"}
                  className="right mobile-menu-text"
                >
                  My Tracks
                </Link>
              </div>
              <div className="row">
                <Link to="/upload/track" className="right mobile-menu-text">
                  Add Track
                </Link>
              </div>
              <div className="row">
                <a href="/api/logout" className="right mobile-menu-text">
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <span className="desktop-hide" />
          )}
        </div>
      </span>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
