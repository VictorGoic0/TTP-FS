import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <NavLink exact to="/">
        Portfolio
      </NavLink>
      <NavLink to="/transactions">Transactions</NavLink>
    </nav>
  );
};

export default Navigation;
