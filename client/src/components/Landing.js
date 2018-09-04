import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Landing extends Component {

  componentDidMount() {
    console.log('props', this.props);
  }

  render() {
    switch(!this.props.auth) {
      case null:

      case false:
        return <Redirect to="/tracks" />;

      default:
        return(
          <div style={{ textAlign: 'center' }}>
            <div className="alert success add-bottom-space">
              <p>First time to BedroomBands? Sweet! Make sure you've read our <Link to="/docs/terms-and-conditions">T&Cs</Link> and <Link to="/docs/privacy-policy">Privacy Policy</Link> and agree to our use of delicious, delicious cookies.</p>
            </div>
            <img src="/bedroombands-landing.png"
                  alt="Bedroom Bands Landing"
                  id='landing-img'
                  />
            <h1 className="profile-title">Collaborate with people who matter</h1>
            <div className="landing-text">
              <p>Forget the music industry, rehashing the same tired noise.</p>
              <p>
                We're building something different - a place where artists from all
                over the world can get together and go make music.
              </p>
              <p>We hope you'll join us.</p>
            </div>
            <a href="/auth/google" className="blue lighten-2 waves-effect waves-light btn-large">JOIN WITH <i className="fab fa-google-plus-g btn-far" /></a>
          </div>
        );
      }
    }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
