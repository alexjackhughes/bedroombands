import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Artist from "./Artist";
import TrackNew from "./Tracks/TrackNew";
import Settings from "./Settings";
import Account from "./Account/Account";
import SurveyNew from "./surveys/SurveyNew";
import TrackExpanded from "./TrackExpanded";
import Footer from "./Footer";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
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
            <Route exact path="/" component={Landing} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/surveys/new" component={TrackNew} />
            <Route exact path="/tracks" component={Dashboard} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/artist/:userId" component={Artist} />
            <Route exact path="/track/:trackId" component={TrackExpanded} />
            <Route path="/tracks/new" component={SurveyNew} />
          </div>
          <div style={{ height: 100 }} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
