import React, { Component } from "react";

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

  render() {
    return (
      <div className="login">
        <h1>Sign In</h1>
        <form>
          <input
            type="text"
            value={this.state.user.email}
            name="email"
            onChange={this.handleChanges}
            placeholder="email"
          />
          <input
            type="password"
            value={this.state.user.password}
            name="password"
            onChange={this.handleChanges}
            placeholder="Password"
          />
          <button>Sign In</button>
        </form>
        <h3>
          Don't Have An Account? <span>Sign Up</span>
        </h3>
      </div>
    );
  }
}

export default Login;
