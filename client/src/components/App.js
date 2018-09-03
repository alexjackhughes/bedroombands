import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Artist from "./Artist";
import TrackNew from "./Tracks/TrackNew";
import Settings from "./Settings";
import Account from "./Account/Account";
import SurveyNew from "./surveys/SurveyNew"; // This is causing the bug where new tracks are actually surveys
import TrackExpanded from "./TrackExpanded";
import UserTracks from "./UserTracks";
import GenericTracks from "./GenericTracks";
import NotFound from "./NotFound";

import Terms from "./static/Terms";
import PrivacyPolicy from "./static/PrivacyPolicy";

import Footer from "./Footer";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();

    console.log(this.props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div
            className="container"
            style={{ paddingTop: "50px", paddingBottom: "50px" }}
          >
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/tracks" component={Dashboard} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/docs/terms-and-conditions" component={Terms} />
              <Route exact path="/docs/privacy-policy" component={PrivacyPolicy} />
              <Route exact path="/artist/:userId" component={Artist} />
              <Route exact path="/artist/:userId/:type" component={UserTracks} />
              <Route exact path="/tracks/:type" component={GenericTracks} />
              <Route exact path="/tracks/:type/:rating" component={GenericTracks} />
              <Route exact path="/track/:trackId" component={TrackExpanded} />
              <Route exact path="/upload/track" component={SurveyNew} />
              <Route component={NotFound}/>
            </Switch>
          </div>
          <div style={{ height: 100 }} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
