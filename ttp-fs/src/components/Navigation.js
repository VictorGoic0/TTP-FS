import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink exact to="/">
        Portfolio
      </NavLink>
      <NavLink to="/transactions">Transactions</NavLink>
      <NavLink to="/purchase">Buy Stock</NavLink>
    </nav>
  );
};

export default Navigation;
