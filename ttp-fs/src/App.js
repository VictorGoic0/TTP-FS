import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Portfolio from "./components/Portfolio";
import Transactions from "./components/Transactions";
import PurchaseStock from "./components/PurchaseStock";
import SellStock from "./components/SellStock";
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
        <PrivateRoute path="/login" component={Login} testPrivate={false} />
        <PrivateRoute path="/signup" component={Signup} testPrivate={false} />
        <PrivateRoute exact path="/" component={Portfolio} testPrivate={true} />
        <PrivateRoute
          path="/transactions"
          component={Transactions}
          testPrivate={true}
        />
        <PrivateRoute
          path="/purchase"
          component={PurchaseStock}
          testPrivate={true}
        />
        <PrivateRoute path="/sell" component={SellStock} testPrivate={true} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
