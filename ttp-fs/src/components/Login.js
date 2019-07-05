import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../actions";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

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
          <FormControl>
            <InputLabel className="label">Email</InputLabel>
            <Input
              required
              type="text"
              value={this.state.user.email}
              name="email"
              onChange={this.handleChanges}
            />
          </FormControl>
          <FormControl>
            <InputLabel className="label">Password</InputLabel>
            <Input
              required
              type="password"
              value={this.state.user.password}
              name="password"
              onChange={this.handleChanges}
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </form>
        <h3>
          Don't Have An Account?{" "}
          <Link to="/signup">
            <span className="switch-span">Sign Up</span>
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
