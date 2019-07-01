import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchUser,
  getTransactions,
  makeTransaction,
  fetchPrices
} from "../actions";
import Stock from "./Stock";
import axios from "axios";

class Portfolio extends Component {
  state = {
    transaction: {
      user_id: this.props.user.id
        ? this.props.user.id
        : localStorage.getItem("userID"),
      symbol: "",
      quantity: 0
    }
  };
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

  handleChanges = e => {
    this.setState({
      transaction: {
        ...this.state.transaction,
        [e.target.name]: e.target.value
      }
    });
  };

  makeTransaction = (e, transacInfo) => {
    e.preventDefault();
    console.log(transacInfo);
    // Make request to IEX API and check price. If quantity * price < user balance, then make the transaction.
    const { balance } = this.props.user; // User funds
    const { quantity, symbol } = this.state.transaction;
    axios
      .get(`https://api.iextrading.com/1.0/tops?symbols=${symbol}`)
      .then(res => {
        const response = res.data;
        if (response.symbol) {
          if (balance >= quantity * response.lastSalePrice) {
            const finalTransaction = { ...transacInfo };
            finalTransaction.price = response.lastSalePrice;
            finalTransaction.sector = response.sector;
            finalTransaction.security_type = response.securityType;
            this.props.makeTransaction(finalTransaction);
          } else {
            alert("You do not have enough funds.");
          }
        } else {
          alert("Please enter a valid symbol.");
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  portfolioValue = () => {
    const prices = this.props.stockList.map(stock => {
      return stock.quantity * this.props.prices[stock.symbol];
    });
    return prices.reduce((acc, curr) => acc + curr);
  };

  render() {
    const {
      fetchingUser,
      fetchingTransactions,
      fetchingPrices,
      user
    } = this.props;
    const { id, balance } = user;

    if (fetchingUser || fetchingTransactions || fetchingPrices || !id) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <>
          <div>
            Portfolio (${this.portfolioValue()})
            {/* Loop over stockList here and create a row entry for each, pass down the needed price from prices */}
            {this.props.stockList.map(stock => (
              <Stock
                key={stock.id}
                stock={stock}
                price={this.props.prices[stock.symbol]}
              />
            ))}
          </div>
          <div>
            <h2>Balance:</h2>
            <h2>${balance.toFixed(2)}</h2>
            <form
              onSubmit={e => this.makeTransaction(e, this.state.transaction)}
            >
              <input
                type="text"
                value={this.state.transaction.symbol}
                name="symbol"
                placeholder="Symbol"
                onChange={this.handleChanges}
              />
              <input
                type="number"
                value={this.state.transaction.quantity}
                name="quantity"
                placeeholder="Quantity"
                onChange={this.handleChanges}
              />
              <button type="submit">BUY</button>
            </form>
          </div>
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
