import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions } from "../actions";

class Transactions extends Component {
  componentDidMount() {
    this.props.getTransactions(localStorage.getItem("userID"));
  }
  render() {
    return <div />;
  }
}

export default connect(
  null,
  { getTransactions }
)(Transactions);
