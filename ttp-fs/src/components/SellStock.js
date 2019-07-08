import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchUser,
  getTransactions,
  fetchPrices,
  makeTransaction
} from "../actions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Spinner from "./Spinner";

class PurchaseStock extends Component {
  state = {
    transaction: {
      user_id: this.props.user.id
        ? this.props.user.id
        : localStorage.getItem("userID"),
      symbol: "",
      quantity: ""
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
      this.props.getTransactions(user_id);
    }
    if (
      this.props.stockList.length > 0 &&
      Object.keys(this.props.prices).length === 0
    ) {
      this.fetchPrices();
    }
  }

  handleChanges = e => {
    this.setState({
      transaction: {
        ...this.state.transaction,
        [e.target.name]: e.target.value
      }
    });
  };

  fetchPrices = () => {
    const symbols = this.props.stockList.map(stock => stock.symbol);
    this.props.fetchPrices(symbols);
  };

  makeTransaction = e => {
    e.preventDefault();
    // Make request to IEX API and check price. If quantity * price < user balance, then make the transaction.
    const { id } = this.props.user; // User funds
    const { quantity } = this.state.transaction;
    const symbol = this.state.transaction.symbol.toUpperCase();
    if (symbol in this.props.prices) {
      const stock = this.props.stockList.find(stock => {
        return stock.symbol === symbol;
      });
      if (stock.quantity >= quantity) {
        const finalTransaction = {
          user_id: id,
          quantity: Number(quantity),
          price: this.props.prices[symbol],
          symbol: stock.symbol,
          sector: stock.sector,
          security_type: stock.securityType,
          transaction_type: "SELL"
        };
        this.props
          .makeTransaction(finalTransaction)
          .then(res => {
            alert("Transaction succeeded!");
            this.setState({
              ...this.state,
              transaction: {
                ...this.state.transaction,
                symbol: "",
                quantity: ""
              }
            });
          })
          .catch(err => {
            alert(`Transaction failed ${err}.`);
          });
      } else {
        alert("You are trying to sell more of this stock than you own.");
      }
    } else {
      alert("You do not own this stock.");
    }
  };

  render() {
    const { user, fetchingUser } = this.props;
    const { balance, id } = user;
    if (fetchingUser || !id) {
      return <Spinner />;
    } else {
      return (
        <div className="purchase">
          <h1>Balance - ${balance.toFixed(2)}</h1>
          <form className="purchase-form" onSubmit={this.makeTransaction}>
            <FormControl>
              <InputLabel className="label">Symbol</InputLabel>
              <Input
                type="text"
                value={this.state.transaction.symbol}
                name="symbol"
                onChange={this.handleChanges}
                fullWidth
              />
            </FormControl>
            <FormControl>
              <InputLabel className="label">Quantity</InputLabel>
              <Input
                type="number"
                value={this.state.transaction.quantity}
                name="quantity"
                onChange={this.handleChanges}
                fullWidth
              />
            </FormControl>
            <Button type="submit" variant="contained">
              SELL
            </Button>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  stockList: state.stockList,
  prices: state.prices,
  fetchingUser: state.fetchingUser,
  error: state.error
});

export default connect(
  mapStateToProps,
  { fetchUser, makeTransaction, getTransactions, fetchPrices }
)(PurchaseStock);
