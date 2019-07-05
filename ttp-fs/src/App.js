import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Portfolio from "./components/Portfolio";
import Transactions from "./components/Transactions";
import PurchaseStock from "./components/PurchaseStock";
import Navigation from "./components/Navigation";
import { withRouter, Redirect, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App(props) {
  return (
    <div className="app-container">
      {props.location.pathname === "/login" ||
      props.location.pathname === "/signup" ? null : (
        <Navigation history={props.history} />
      )}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute exact path="/" component={Portfolio} />
        <PrivateRoute path="/transactions" component={Transactions} />
        <PrivateRoute path="/purchase" component={PurchaseStock} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
