import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Portfolio from "./components/Portfolio";
import Transactions from "./components/Transactions";
import Navigation from "./components/Navigation";
import { withRouter } from "react-router-dom";
import axios from "axios";

axios.interceptors.request.use(requestConfig => {
  const token = localStorage.getItem("token");
  requestConfig.headers.authorization = token;
  return requestConfig;
});
// Will move to its own file later

function App(props) {
  return (
    <div>
      {props.location.pathname === "/login" ||
      props.location.pathname === "/signup" ? null : (
        <Navigation />
      )}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route exact path="/" component={Portfolio} />
      <Route path="/transactions" component={Transactions} />
    </div>
  );
}

export default withRouter(App);
