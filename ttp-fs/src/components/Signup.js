import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../actions";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Signup extends Component {
  state = {
    user: {
      name: "",
      email: "",
      password: ""
    }
  };

  handleChanges = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  };

  signUp = (e, userInfo) => {
    e.preventDefault();
    this.props
      .signUp(userInfo)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    return (
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={e => this.signUp(e, this.state.user)}>
          <TextField
            type="text"
            value={this.state.user.name}
            name="name"
            onChange={this.handleChanges}
            label="Name"
          />
          <TextField
            type="email"
            value={this.state.user.email}
            name="email"
            onChange={this.handleChanges}
            label="Email"
          />
          <TextField
            type="password"
            value={this.state.user.password}
            name="password"
            onChange={this.handleChanges}
            label="Password"
          />
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </form>
        <h3>
          Already Have An Account?{" "}
          <Link to="/login">
            <span>Sign In</span>
          </Link>
        </h3>
      </div>
    );
  }
}

export default connect(
  null,
  { signUp }
)(Signup);
