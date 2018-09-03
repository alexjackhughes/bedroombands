import React, { Component } from 'react';

class Terms extends Component {

  componentDidMount() {
    console.log('props', this.props);
  }

  render() {
        return(
          <div style={{ textAlign: 'center' }}>
            <h1 className="profile-title">Terms & Conditions</h1>
            <div className="landing-text">
              <p>Forget the music industry, rehashing the same tired noise.</p>
              <p>
                We're building something different - a place where artists from all
                over the world can get together and go make music.
              </p>
              <p>We hope you'll join us.</p>
            </div>
          </div>
        );
    }
}

export default Terms;
