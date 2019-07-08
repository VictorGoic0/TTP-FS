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
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.userID);
      return dispatch({ type: SIGN_UP_SUCCESS, payload: res.data.token });
    })
    .catch(err => {
      return dispatch({
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
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.userID);
      return dispatch({ type: SIGN_IN_SUCCESS, payload: res.data.token });
    })
    .catch(err => {
      return dispatch({
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
      for (let stock of payload) {
        const type = stock.transaction_type;
        const symbol = stock.symbol;
        if (symbol in table) {
          if (type === "BUY") {
            table[symbol].quantity += stock.quantity;
          } else {
            table[symbol].quantity -= stock.quantity;
          }
        } else {
          table[symbol] = { ...stock };
        }
      }
      const values = Object.values(table);
      const portfolio = values.filter(stock => {
        return stock.quantity > 0;
      });
      return dispatch({ type: GET_TRANSACTIONS_SUCCESS, payload, portfolio });
    })
    .catch(err => {
      return dispatch({
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
  return axiosAuth()
    .post(`${endpoint}/api/transactions`, transactionInfo)
    .then(res => {
      return dispatch({
        type: MAKE_TRANSACTION_SUCCESS,
        payload: res.data,
        balance: transactionInfo.quantity * transactionInfo.price
      });
    })
    .catch(err => {
      return dispatch({
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
      `https://api.iextrading.com/1.0/tops/last?filter=symbol,price&symbols=${symbols.join(
        ","
      )}`
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

export const FETCH_MOVEMENT = "FETCH_MOVEMENT";
export const FETCH_MOVEMENT_SUCCESS = "FETCH_MOVEMENT_SUCCESS";
export const FETCH_MOVEMENT_FAILURE = "FETCH_MOVEMENT_FAILURE";

export const fetchMovement = symbols => dispatch => {
  dispatch({ type: FETCH_MOVEMENT });
  axios
    .get(
      `https://api.iextrading.com/1.0/deep/official-price?symbols=${symbols.join(
        ","
      )}`
    )
    .then(res => {
      const results = res.data;
      const table = {};
      for (let stock of results) {
        if (stock.symbol in table) {
          continue;
        } else {
          table[stock.symbol] = { ...stock };
          // Not sure how to parse this yet, test requests to this endpoint return nothing.
        }
      }
      dispatch({ type: FETCH_MOVEMENT_SUCCESS, payload: table });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: FETCH_MOVEMENT_FAILURE, payload: err.message });
    });
};

export const LOG_OUT = "LOG_OUT";

export const logOut = () => {
  localStorage.clear();
  return {
    type: LOG_OUT
  };
};
