import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions, fetchPrices } from "../actions";
import Stock from "./Stock";
import PurchaseStock from "./PurchaseStock";

class Portfolio extends Component {
  componentDidMount() {
    const user_id = this.props.user.id
      ? this.props.user.id
      : localStorage.getItem("userID");
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
      console.log("fetching");
      return <h1>Loading...</h1>;
    } else {
      return (
        <>
          <div className="portfolio">
            {stockList.length > 0 ? (
              <h2>Portfolio ${this.portfolioValue()}</h2>
            ) : (
              <h1>You do not own any stock yet</h1>
            )}
            {/* Loop over stockList here and create a row entry for each, pass down the needed price from prices */}
            {stockList.map(stock => (
              <Stock
                key={stock.id}
                stock={stock}
                price={this.props.prices[stock.symbol]}
              />
            ))}
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  fetchingTransactions: state.fetchingTransactions,
  fetchingPrices: state.fetchingPrices,
  stockList: state.stockList,
  prices: state.prices,
  error: state.error
});

export default connect(
  mapStateToProps,
  { getTransactions, fetchPrices }
)(Portfolio);
