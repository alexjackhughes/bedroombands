import React from "react";

export default () => {
  const footerStyling = {
    // display: 'block',
    // width: '100%',
    // position: 'fixed',
    // bottom: 0
  };
  return (
    <footer className="page-footer light-blue lighten-1" style={footerStyling}>
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">BedroomBands</h5>
            <p className="grey-text text-lighten-4">
              This is a community, so if you have any feedback - let us know!
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  View Tracks
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Upload a Track
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  My Favourites
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  My Tracks
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <span>© 2018 BedroomBands</span>
          <a className="grey-text text-lighten-4 right" href="/">
            Go Make Music
          </a>
        </div>
      </div>
    </footer>
  );
};
