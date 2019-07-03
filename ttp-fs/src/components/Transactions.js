import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions } from "../actions";
import Transaction from "./Transaction";
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
      return (
        <div className="transactions">
          <h1>Transactions</h1>
          {transactions.map(transaction => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </div>
      );
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
