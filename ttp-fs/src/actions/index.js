import axios from "axios";
import axiosAuth from "../components/Authenticate";

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
  return axiosAuth()
    .get(`${endpoint}/api/users/${user_id}/transactions`)
    .then(res => {
      const payload = res.data;
      const table = {};
      const length = payload.length;
      for (let i = 0; i < length; i++) {
        const symbol = payload[i].symbol;
        if (symbol in table) {
          table[symbol].quantity += payload[i].quantity;
        } else {
          table[symbol] = payload[i];
        }
      }
      const portfolio = Object.values(table);
      dispatch({ type: GET_TRANSACTIONS_SUCCESS, payload, portfolio });
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
  axiosAuth()
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
  axiosAuth()
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

export const FETCH_PRICES = "FETCH_PRICES";
export const FETCH_PRICES_SUCCESS = "FETCH_PRICES_SUCCESS";
export const FETCH_PRICES_FAILURE = "FETCH_PRICES_FAILURE";

export const fetchPrices = symbols => dispatch => {
  dispatch({ type: FETCH_PRICES });
  axios
    .get(
      `https://api.iextrading.com/1.0/tops/last?symbols=${symbols.join(",")}`
    )
    .then(res => {
      const results = res.data;
      const table = {};
      const length = results.length;
      for (let i = 0; i < length; i++) {
        if (results[i].symbol in table) {
          continue;
        } else {
          table[results[i].symbol] = results[i].price;
        }
      }
      dispatch({ type: FETCH_PRICES_SUCCESS, payload: table });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: FETCH_PRICES_FAILURE, payload: err.message });
    });
};
