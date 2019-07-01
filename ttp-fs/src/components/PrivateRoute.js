import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.signedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = state => ({
  signedIn: state.signedIn
});

export default connect(
  mapStateToProps,
  {}
)(PrivateRoute);
