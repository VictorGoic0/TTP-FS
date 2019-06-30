import React, { Component } from "react";

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

  render() {
    return (
      <div className="register">
        <h1>Register</h1>
        <form>
          <input
            type="text"
            value={this.state.user.name}
            name="name"
            onChange={this.handleChanges}
            placeholder="name"
          />
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
          <button>Sign Up</button>
        </form>
        <h3>
          Already Have An Account? <span>Sign In</span>
        </h3>
      </div>
    );
  }
}

export default Signup;
