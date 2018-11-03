import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Landing extends Component {
  componentDidMount() {
    console.log("props", this.props);
  }

  render() {
    switch (!this.props.auth) {
      case null:

      case false:
        return <Redirect to="/tracks" />;

      default:
        return (
          <div style={{ textAlign: "center" }}>
            <div className="alert success add-bottom-space">
              <p>
                First time to BedroomBands? Sweet! Make sure you've read our{" "}
                <Link to="/docs/terms-and-conditions">T&Cs</Link> and{" "}
                <Link to="/docs/privacy-policy">Privacy Policy</Link> and agree
                to our use of your delicious, delicious cookies.
              </p>
            </div>
            <img
              src="/bedroombands-landing.png"
              alt="Bedroom Bands Landing"
              id="landing-img"
            />
            <h1 className="profile-title">Welcome to BedroomBands!</h1>
            <div className="landing-text">
              <p>
                There are so many good musicians out there, all writing and
                recording in their bedrooms. If you're here, you're probably one
                of them.
              </p>
              <p>
                We want to use technology to unite bedroom musicians, and to
                make possible international collaborations that would have been
                impossible even 10 years ago. We want to help create bedroom
                bands with members all over the world!
              </p>
              <p>We hope you'll join us.</p>
            </div>
            <a
              href="/auth/google"
              className="blue lighten-2 waves-effect waves-light btn-large"
            >
              JOIN WITH <i className="fab fa-google-plus-g btn-far" />
            </a>
          </div>
        );
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
