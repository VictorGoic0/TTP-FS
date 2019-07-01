import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  MAKE_TRANSACTION,
  MAKE_TRANSACTION_SUCCESS,
  MAKE_TRANSACTION_FAILURE,
  FETCH_PRICES,
  FETCH_PRICES_SUCCESS,
  FETCH_PRICES_FAILURE
} from "../actions";

const initialState = {
  signingIn: false,
  signingUp: false,
  signedIn: localStorage.getItem("token") ? true : false,
  fetchingTransactions: false,
  fetchingPrices: false,
  transactions: [],
  stockList: [],
  prices: {},
  user: {},
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        signingUp: true,
        error: null
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        signedIn: true
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signingUp: false,
        signedIn: false,
        error: action.payload
      };
    case SIGN_IN:
      return {
        ...state,
        signingIn: true,
        error: null
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        signingIn: false,
        signedIn: true
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        signingIn: false,
        signedIn: false,
        error: action.payload
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        fetchingTransactions: true,
        error: null
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        stockList: action.portfolio,
        fetchingTransactions: false
      };
    case GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        fetchingTransactions: false,
        error: action.payload
      };
    case FETCH_USER:
      return {
        ...state,
        fetchingUser: true,
        error: null
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        fetchingUser: false
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        fetchingUser: false,
        error: action.payload
      };
    case MAKE_TRANSACTION:
      return {
        ...state,
        makingTransaction: true,
        error: null
      };
    case MAKE_TRANSACTION_SUCCESS:
      return {
        ...state,
        makingTransaction: false,
        transactions: [...state.transactions, action.payload]
      };
    case MAKE_TRANSACTION_FAILURE:
      return {
        ...state,
        makingTransaction: false,
        error: action.payload
      };
    case FETCH_PRICES:
      return {
        ...state,
        fetchingPrices: true,
        error: null
      };
    case FETCH_PRICES_SUCCESS:
      return {
        ...state,
        fetchingPrices: false,
        prices: action.payload
      };
    case FETCH_PRICES_FAILURE:
      return {
        ...state,
        fetchingPrices: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
