import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, makeTransaction } from "../actions";
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
    if (!this.props.user.id) {
      const user_id = localStorage.getItem("userID");
      this.props.fetchUser(user_id);
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

  makeTransaction = (e, transacInfo) => {
    e.preventDefault();
    // Make transaction
    console.log(transacInfo);
    // Make request to IEX API and check price. If quantity * price < user balance, then make the transaction.
    const balance = this.props.user.balance;
    const quantity = this.state.transaction.quantity;
    const symbol = this.state.transaction.symbol;
    axios
      .get(`https://api.iextrading.com/1.0/tops?symbols=${symbol}`)
      .then(res => {
        const response = res.data;
        if (response.symbol) {
          if (balance >= quantity * response.lastSalePrice) {
            this.props.makeTransaction(transacInfo);
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

  render() {
    const { fetchingUser, user } = this.props;
    const { id, balance } = user;

    if (fetchingUser || !id) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div>
          <h2>Balance:</h2>
          <h2>${balance.toFixed(2)}</h2>
          <form onSubmit={e => this.makeTransaction(e, this.state.transaction)}>
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
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  fetchingUser: state.fetchingUser,
  error: state.error
});

export default connect(
  mapStateToProps,
  { fetchUser, makeTransaction }
)(Portfolio);
