import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, makeTransaction } from "../actions";
import axios from "axios";
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
  }

  handleChanges = e => {
    this.setState({
      transaction: {
        ...this.state.transaction,
        [e.target.name]: e.target.value
      }
    });
  };

  makeTransaction = e => {
    e.preventDefault();
    // Make request to IEX API and check price. If quantity * price < user balance, then make the transaction.
    const { balance, id } = this.props.user; // User funds
    const { quantity, symbol } = this.state.transaction;
    axios
      .get(`https://api.iextrading.com/1.0/tops?symbols=${symbol}`)
      .then(res => {
        const response = res.data[0];
        if (response) {
          if (balance >= quantity * response.lastSalePrice) {
            const finalTransaction = {
              user_id: id,
              quantity: Number(quantity),
              symbol: response.symbol,
              price: response.lastSalePrice,
              sector: response.sector,
              security_type: response.securityType,
              transaction_type: "BUY"
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
            // If the IEX API returns a valid result, but the price of the stock * quantity of stock is greater than the user balance, then the user does not have enough funds.
            alert("You do not have enough funds.");
          }
        } else {
          // If the IEX API does not return a result, then the provided symbol was invalid.
          alert("Please enter a valid symbol.");
        }
      })
      .catch(err => {
        console.error(err);
      });
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
              BUY
            </Button>
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
)(PurchaseStock);
