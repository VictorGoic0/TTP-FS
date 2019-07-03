import React, { memo } from "react";
import { NavLink } from "react-router-dom";

const Navigation = props => {
  const logOut = () => {
    localStorage.clear();
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
      <p onClick={logOut}>Log Out</p>
    </nav>
  );
};

export default memo(Navigation);
