import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

class Portfolio extends Component {
  componentDidMount() {
    if (!this.props.user.id) {
      const user_id = localStorage.getItem("userID");
      this.props.fetchUser(user_id);
    }
  }
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
          <form>
            <input type="text" />
            <input type="number" />
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
  { fetchUser }
)(Portfolio);
