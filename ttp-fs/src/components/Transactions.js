import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions } from "../actions";
import TransactionList from "./TransactionList";
import Spinner from "./Spinner";

class Transactions extends Component {
  componentDidMount() {
    if (this.props.transactions.length === 0) {
      this.props.getTransactions(localStorage.getItem("userID"));
    }
  }

  render() {
    const { transactions, fetchingTransactions } = this.props;
    if (fetchingTransactions) {
      return <Spinner />;
    } else if (transactions.length === 0) {
      return (
        <div className="transactions">
          <h1>You have not made any transactions yet</h1>
        </div>
      );
    } else {
      return <TransactionList transactions={transactions} />;
    }
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions,
  fetchingTransactions: state.fetchingTransactions,
  error: state.error
});

export default connect(
  mapStateToProps,
  { getTransactions }
)(Transactions);
