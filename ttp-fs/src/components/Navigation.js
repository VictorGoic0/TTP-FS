import React, { memo } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../actions";

const Navigation = props => {
  const logOut = () => {
    props.logOut();
    props.history.push("/login");
  };
  return (
    <nav className="navigation">
      <NavLink exact to="/">
        <p>Portfolio</p>
      </NavLink>
      <NavLink to="/transactions">
        {" "}
        <p>Transactions</p>
      </NavLink>
      <NavLink to="/purchase">
        <p>Buy Stock</p>
      </NavLink>
      <NavLink to="/sell">
        <p>Sell Stock</p>
      </NavLink>
      <p onClick={logOut}>Log Out</p>
    </nav>
  );
};

const MemNav = memo(Navigation);

export default connect(
  null,
  { logOut }
)(MemNav);
