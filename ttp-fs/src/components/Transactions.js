import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions } from "../actions";

class Transactions extends Component {
  componentDidMount() {
    if (this.props.transactions.length === 0) {
      this.props.getTransactions(localStorage.getItem("userID"));
    }
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions,
  error: state.error
});

export default connect(
  mapStateToProps,
  { getTransactions }
)(Transactions);
