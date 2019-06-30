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

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUser = user_id => dispatch => {
  dispatch({ type: FETCH_USER });
  axios
    .get(`${endpoint}/api/users/${user_id}`)
    .then(res => {
      dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: FETCH_USER_FAILURE,
        payload: `${err.message}. ${err.response.data.message}`
      });
    });
};

export const MAKE_TRANSACTION = "MAKE_TRANSACTION";
export const MAKE_TRANSACTION_SUCCESS = "MAKE_TRANSACTION_SUCCESS";
export const MAKE_TRANSACTION_FAILURE = "MAKE_TRANSACTION_FAILURE";

export const makeTransaction = transactionInfo => dispatch => {
  dispatch({ type: MAKE_TRANSACTION });
  axios
    .post(`${endpoint}/api/transactions`, transactionInfo)
    .then(res => {
      dispatch({ type: MAKE_TRANSACTION_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: MAKE_TRANSACTION_FAILURE,
        payload: `${err.message}. ${err.response.data.message}`
      });
    });
};
