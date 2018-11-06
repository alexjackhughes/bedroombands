import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS, FETCH_TRACKS } from "./types";

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchTracks = () => async dispatch => {
  const res = await axios.get("/api/tracks");
  dispatch({ type: FETCH_TRACKS, payload: res.data });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitUser = (values, history) => async dispatch => {
  console.log("API Submit User", res);
  const res = await axios.put("/api/current_user", values);
  history.push("/users");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitTrack = (values, history) => async dispatch => {
  console.log("Track is being submitted", values);
  const res = await axios.post("/api/track", values);
  history.push("/tracks");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Un-Refactored Version:
//  export const fetchUser = () => {
//   return function(dispatch) {
//     axios.get('/api/current_user')
//     .then(res => dispatch({ type: FETCH_USER, payload: res }))
//   }
// };
