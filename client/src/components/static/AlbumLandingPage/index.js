import React, { Component } from "react";

class AlbumLandingPage extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div class="album-container">
          <div>
            <img
              class="album-landing-image"
              src="https://prismic-io.s3.amazonaws.com/alexjackhughes%2Fa54fb61e-9aa5-44e6-8344-a515ae7cd63f_looking+for+group+artwork.jpg"
            />
          </div>
          <div class="album-content">
            <h1 className="page-title">Looking For A Group: The Album</h1>
            <p class="album-paragraph">
              An experiment in collaboration, this album has been written,
              recorded and released by people who have never met.
            </p>
            <p class="album-paragraph">
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
            <p class="album-paragraph">
              Our community is based on the premise that, with today’s
              technology, it’s possible to make high-quality, original music
              with strangers. Thanks to modern digital recording equipment and
              file-sharing, unfinished, homemade tracks can be completed with
              help from other amateur musicians. This means songs which require
              vocals, guitar, piano, production or whatever else can be finished
              collaboratively – rather than sit incomplete on someone’s hard
              drive.
            </p>
            <p class="album-paragraph">
              Every month for a year (February 2018–2019), the moderation team
              put forward five Bedroom Bands collaborations completed during the
              previous month for the community to vote on. The song with the
              most votes was awarded a spot on Looking for Group. In other
              words, each of the songs you’re about to hear has the community’s
              seal of approval.
            </p>
            <iframe
              title="BedroomBands Album Launch"
              width="50%"
              height="150"
              scrolling="no"
              frameborder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/470719647&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            />
            <div class="album-call-to-action">
              <h1 className="page-title">Let's Make Sweet Music (Together)</h1>
              <p style={{ fontSize: "16px" }}>
                There are so many good musicians out there, all writing and
                recording in their bedrooms. If you're here, you're probably one
                of them.
              </p>
              <p style={{ fontSize: "16px" }}>
                We're building a platform to help increase their reach and find
                new, interesting collaborations. Why not join over 12,000
                artists creating new tracks every day?
              </p>
              <a
                href="/auth/google"
                className="blue lighten-2 waves-effect waves-light btn-large"
              >
                LOGIN WITH GOOGLE
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AlbumLandingPage;
