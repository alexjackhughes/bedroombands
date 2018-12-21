import React, { Component } from "react";

class Terms extends Component {
  componentDidMount() {
    console.log("props", this.props);
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 classNameName="profile-title">Terms & Conditions</h1>
        <div classNameName="landing-text">
          <p className="p1">
            <span className="s1">
              Welcome to our website. If you continue to browse and use this
              website, you are agreeing to comply with and be bound by the
              following terms and conditions of use, which together with our
              privacy policy govern BedroomBands's relationship with you in
              relation to this website. If you disagree with any part of these
              terms and conditions, please do not use our website.
            </span>
          </p>
          <p className="p1">
            <span className="s1">
              The term 'BedroomBands' or 'us' or 'we' refers to the owner of the
              website whose registered office is Britannia House, Caerphilly
              Business Park, Van Rd, Caerphilly CF83 3GG. The term 'you' refers
              to the user or viewer of our website.
            </span>
          </p>
          <p className="p1">
            <span className="s1">
              The use of this website is subject to the following terms of use:
            </span>
          </p>
          <p className="li2">
            <span className="s2">
              {" "}
              The content of the pages of this website is for your general
              information and use only. It is subject to change without notice.
            </span>
          </p>
          <p className="li2">
            <span className="s2">
              {" "}
              This website uses cookies to monitor browsing preferences. If you
              do allow cookies to be used, the following personal information
              may be stored by us for use by third parties: [email address, any
              tracks you make, tracks you like, artists you follow].
            </span>
          </p>
          <p className="li2">
            <span className="s2">
              {" "}
              Neither we nor any third parties provide any warranty or guarantee
              as to the accuracy, timeliness, performance, completeness or
              suitability of the information and materials found or offered on
              this website for any particular purpose. You acknowledge that such
              information and materials may contain inaccuracies or errors and
              we expressly exclude liability for any such inaccuracies or errors
              to the fullest extent permitted by law.
            </span>
          </p>
          <p className="li2">
            <span className="s2">
              {" "}
              Your use of any information or materials on this website is
              entirely at your own risk, for which we shall not be liable. It
              shall be your own responsibility to ensure that any products,
              services or information available through this website meet your
              specific requirements.
            </span>
          </p>
          <p className="li2">
            <span className="s2">
              {" "}
              This website contains material which is owned by or licensed to
              us. This material includes, but is not limited to, the design,
              layout, look, appearance and graphics. Reproduction is prohibited
              other than in accordance with the copyright notice, which forms
              part of these terms and conditions.
            </span>
          </p>
          <p className="li2">
            <span className="s2">
              {" "}
              All trade marks reproduced in this website which are not the
              property of, or licensed to, the operator are acknowledged on the
              website.
            </span>
          </p>
          <p className="li2">
            <span className="s2">
              {" "}
              Unauthorised use of this website may give rise to a claim for
              damages and/or be a criminal offence.
            </span>
          </p>
          <p className="li2">
            <span className="s2">
              {" "}
              From time to time this website may also include links to other
              websites. These links are provided for your convenience to provide
              further information. They do not signify that we endorse the
              website(s). We have no responsibility for the content of the
              linked website(s).
            </span>
          </p>
          <p className="li2">
            <span className="s2">
              {" "}
              Your use of this website and any dispute arising out of such use
              of the website is subject to the laws of England, Northern
              Ireland, Scotland and Wales.
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default Terms;
