import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchUser,
  getTransactions,
  makeTransaction,
  fetchPrices
} from "../actions";
import Stock from "./Stock";
import PurchaseStock from "./PurchaseStock";

class Portfolio extends Component {
  componentDidMount() {
    const user_id = this.props.user.id
      ? this.props.user.id
      : localStorage.getItem("userID");
    if (!this.props.user.id) {
      this.props.fetchUser(user_id);
    }
    if (this.props.stockList.length === 0) {
      this.props
        .getTransactions(user_id)
        .then(res => {
          this.fetchPrices();
        })
        .catch(err => {
          console.error(err);
        });
    } else if (this.props.stockList.length > 0) {
      if (Object.keys(this.props.prices) === 0) {
        this.fetchPrices();
      }
    }
  }

  fetchPrices = () => {
    // In order for the portfolio to display the most up to date price information, a request for that information must be made
    const symbols = this.props.stockList.map(stock => stock.symbol);
    this.props.fetchPrices(symbols);
  };

  portfolioValue = () => {
    const prices = this.props.stockList.map(stock => {
      return stock.quantity * this.props.prices[stock.symbol];
    });
    return prices.reduce((acc, curr) => acc + curr);
  };

  render() {
    const { fetchingTransactions, fetchingPrices, stockList } = this.props;

    if (fetchingTransactions || fetchingPrices) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <>
          <div>
            {stockList.length > 0 ? (
              <>(Portfolio ${this.portfolioValue()})</>
            ) : null}
            {/* Loop over stockList here and create a row entry for each, pass down the needed price from prices */}
            {this.props.stockList.map(stock => (
              <Stock
                key={stock.id}
                stock={stock}
                price={this.props.prices[stock.symbol]}
              />
            ))}
          </div>
          <PurchaseStock />
        </>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  fetchingUser: state.fetchingUser,
  fetchingTransactions: state.fetchingTransactions,
  fetchingPrices: state.fetchPrices,
  stockList: state.stockList,
  prices: state.prices,
  error: state.error
});

export default connect(
  mapStateToProps,
  { fetchUser, makeTransaction, getTransactions, fetchPrices }
)(Portfolio);
