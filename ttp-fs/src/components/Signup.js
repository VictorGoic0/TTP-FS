import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../actions";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

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
      <div className="signup">
        <h1>VGX Trading</h1>
        <h1>Sign Up</h1>
        <form
          className="input-form"
          onSubmit={e => this.signUp(e, this.state.user)}
        >
          <FormControl>
            <InputLabel className="label">Name</InputLabel>
            <Input
              type="text"
              value={this.state.user.name}
              name="name"
              onChange={this.handleChanges}
              label="Name"
            />
          </FormControl>
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
            Sign Up
          </Button>
        </form>
        <h3>
          Already Have An Account?{" "}
          <Link to="/login">
            <span className="switch-span">Sign In</span>
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
