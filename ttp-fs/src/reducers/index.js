import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE
} from "../actions";

const initialState = {
  signingIn: false,
  signingUp: false,
  signedIn: localStorage.getItem("token") ? true : false,
  fetchingTransactions: false,
  transactions: [],
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
        transactions: action.payload,
        fetchingTransactions: false
      };
    case GET_TRANSACTIONS_FAILURE:
      return {
        fetchingTransactions: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
