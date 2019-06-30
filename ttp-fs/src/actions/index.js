import axios from "axios";
const endpoint = process.env.REACT_APP_BACKENDPOINT;

export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const signUp = userInfo => dispatch => {
  dispatch({ type: SIGN_UP });
  return axios
    .post(`${endpoint}/api/auth/register/`, userInfo)
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
    .post(`${endpoint}/api/auth/login/`, userInfo)
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

export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const GET_TRANSACTIONS_SUCCESS = "GET_TRANSACTIONS_SUCCESS";
export const GET_TRANSACTIONS_FAILURE = "GET_TRANSACTIONS_FAILURE";

export const getTransactions = user_id => dispatch => {
  dispatch({ type: GET_TRANSACTIONS });
  axios
    .get(`${endpoint}/api/users/${user_id}/transactions`)
    .then(res => {
      dispatch({ type: GET_TRANSACTIONS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_TRANSACTIONS_FAILURE,
        payload: `${err.message}. ${err.response.data.message}`
      });
    });
};
