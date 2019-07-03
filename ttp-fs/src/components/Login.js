import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../actions";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends Component {
  state = {
    user: {
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

  signIn = (e, userInfo) => {
    e.preventDefault();
    console.log(userInfo);
    this.props
      .signIn(userInfo)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    return (
      <div className="login">
        <h1>VGX Trading</h1>
        <h1>Log In</h1>
        <form
          className="input-form"
          onSubmit={e => this.signIn(e, this.state.user)}
        >
          <div className="field-container">
            <TextField
              type="text"
              value={this.state.user.email}
              name="email"
              onChange={this.handleChanges}
              label="Email"
            />
          </div>
          <div className="field-container">
            <TextField
              type="password"
              value={this.state.user.password}
              name="password"
              onChange={this.handleChanges}
              label="Password"
            />
          </div>
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </form>
        <h3>
          Don't Have An Account?{" "}
          <Link to="/signup">
            <span>Sign Up</span>
          </Link>
        </h3>
      </div>
    );
  }
}

export default connect(
  null,
  { signIn }
)(Login);
