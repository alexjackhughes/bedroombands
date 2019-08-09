import "materialize-css/dist/css/materialize.min.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";
import Axios from "axios";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

componentDidMount = () => {
  Axios.get("url").then(res => {
    this.SVGElementInstanceList({ returneddata: res.data });
  });
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
