import axios from "axios";
const endpoint = process.env.REACT_APP_BACKENDPOINT;

export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const signUp = userInfo => dispatch => {
  dispatch({ type: SIGN_UP });
  return axios
    .post(`${endpoint}/auth/register/`, userInfo)
    .then(res => {
      dispatch({ type: SIGN_UP_SUCCESS, payload: res.data.token });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.userID);
    })
    .catch(err => {
      dispatch({
        type: SIGN_UP_FAILURE,
        payload: `${err.message}. ${err.response.data.message}`
      });
    });
};

export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";

export const signIn = userInfo => dispatch => {
  dispatch({ type: SIGN_IN });
  return axios
    .post(`${endpoint}/auth/login/`, userInfo)
    .then(res => {
      dispatch({ type: SIGN_IN_SUCCESS, payload: res.data.token });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.userID);
    })
    .catch(err => {
      dispatch({
        type: SIGN_IN_FAILURE,
        payload: `${err.message}. ${err.response.data.message}`
      });
    });
};
