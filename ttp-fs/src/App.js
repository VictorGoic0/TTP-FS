import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Portfolio from "./components/Portfolio";
import Transactions from "./components/Transactions";
import Navigation from "./components/Navigation";
import axios from "axios";

axios.interceptors.request.use(requestConfig => {
  const token = localStorage.getItem("token");
  requestConfig.headers.authorization = token;
  return requestConfig;
});
// Will move to its own file later

function App() {
  return (
    <div>
      <Navigation />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route exact path="/" component={Portfolio} />
      <Route path="/transactions" component={Transactions} />
    </div>
  );
}

export default App;
