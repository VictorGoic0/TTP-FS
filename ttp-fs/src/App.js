import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Portfolio from "./components/Portfolio";
import Transactions from "./components/Transactions";
import Navigation from "./components/Navigation";
import { withRouter, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App(props) {
  return (
    <div>
      {props.location.pathname === "/login" ||
      props.location.pathname === "/signup" ? null : (
        <Navigation />
      )}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/*" render={() => <Redirect to="/" />} />
      <PrivateRoute exact path="/" component={Portfolio} />
      <PrivateRoute path="/transactions" component={Transactions} />
    </div>
  );
}

export default withRouter(App);
