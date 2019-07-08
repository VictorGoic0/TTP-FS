import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions, fetchPrices, fetchOpenings } from "../actions";
import StockList from "./StockList";
import Spinner from "./Spinner";

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
      if (Object.keys(this.props.prices).length === 0) {
        this.fetchPrices();
      }
    }
  }

  fetchPrices = () => {
    // In order for the portfolio to display the most up to date price information, a request for that information must be made
    const symbols = this.props.stockList.map(stock => stock.symbol);
    this.props.fetchPrices(symbols);
    // this.props.fetchOpenings(symbols);
  };

  portfolioValue = () => {
    const prices = this.props.stockList.map(stock => {
      return stock.quantity * this.props.prices[stock.symbol];
    });
    return prices.reduce((acc, curr) => acc + curr);
  };

  render() {
    const {
      fetchingTransactions,
      fetchingPrices,
      stockList,
      prices
    } = this.props;

    if (fetchingTransactions || fetchingPrices) {
      return <Spinner />;
    } else {
      return (
        <div className="portfolio">
          {stockList.length > 0 ? (
            <h1>Portfolio (${this.portfolioValue().toFixed(2)})</h1>
          ) : (
            <h1>You do not own any stock yet</h1>
          )}
          {/* Loop over stockList here and create a row entry for each, pass down the needed price from prices */}
          <StockList stockList={stockList} prices={prices} />
        </div>
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
  { getTransactions, fetchPrices, fetchOpenings }
)(Portfolio);
