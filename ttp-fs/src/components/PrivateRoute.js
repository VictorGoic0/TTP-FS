import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, testPrivate, ...rest }) => {
  if (testPrivate) {
    return (
      <Route
        {...rest}
        render={props =>
          rest.signedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={props =>
          !rest.signedIn ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
};

const mapStateToProps = state => ({
  signedIn: state.signedIn
});

export default connect(
  mapStateToProps,
  {}
)(PrivateRoute);
