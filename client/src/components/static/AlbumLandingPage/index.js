import React, { Component } from "react";
import { connect } from "react-redux";

class AlbumLandingPage extends Component {
  render() {
    console.log("woo", this.props);
    return (
      <div style={{ textAlign: "center" }}>
        <div className="album-container">
          <div>
            <img
              className="album-landing-image"
              src="https://prismic-io.s3.amazonaws.com/alexjackhughes%2Fa54fb61e-9aa5-44e6-8344-a515ae7cd63f_looking+for+group+artwork.jpg"
            />
          </div>
          <div className="album-content">
            <h1 className="page-title">Looking For A Group: The Album</h1>
            <p className="album-paragraph">
              An experiment in collaboration, this album has been written,
              recorded and released by people who have never met.
            </p>
            <p className="album-paragraph">
              <a
                href="https://reddit.com/r/BedroomBands"
                target="_blank"
                rel="noopener noreferrer"
              >
                r/BedroomBands
              </a>{" "}
              is an online community (a subreddit) that has been created to help
              musicians finish their songs so that the world can hear them.
              Looking for Group is a showcase of some of that work.
            </p>
            <p className="album-paragraph">
              Our community is based on the premise that, with today’s
              technology, it’s possible to make high-quality, original music
              with strangers. Thanks to modern digital recording equipment and
              file-sharing, unfinished, homemade tracks can be completed with
              help from other amateur musicians. This means songs which require
              vocals, guitar, piano, production or whatever else can be finished
              collaboratively – rather than sit incomplete on someone’s hard
              drive.
            </p>
            <p className="album-paragraph">
              Every month for a year (February 2018–2019), the moderation team
              put forward five Bedroom Bands collaborations completed during the
              previous month for the community to vote on. The song with the
              most votes was awarded a spot on Looking for Group. In other
              words, each of the songs you’re about to hear has the community’s
              seal of approval.
            </p>
            <iframe
              width="60%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/750759624&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            />
            {!this.props.auth ? (
              <div className="album-call-to-action">
                <h1 className="page-title">Let's Make Sweet Music</h1>
                <p style={{ fontSize: "16px" }}>
                  There are so many good musicians out there, all writing and
                  recording in their bedrooms. If you're here, you're probably
                  one of them.
                </p>
                <p style={{ fontSize: "16px" }}>
                  We want to use technology to unite bedroom musicians, and to
                  make possible international collaborations that would have
                  been impossible even 10 years ago. We want to help create
                  bedroom bands with members all over the world!
                </p>
                <a
                  href="/auth/google"
                  className="blue lighten-2 waves-effect waves-light btn-large"
                >
                  JOIN WITH GOOGLE
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(AlbumLandingPage);
