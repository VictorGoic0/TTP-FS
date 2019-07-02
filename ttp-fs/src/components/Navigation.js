import React, {memo} from "react";
import { NavLink } from "react-router-dom";

const Navigation = props => {
  const logOut = () => {
    localStorage.clear();
    props.history.push('/login')
  }
  return (
    <nav className="navigation">
      <NavLink exact to="/">
        Portfolio
      </NavLink>
      <NavLink to="/transactions">Transactions</NavLink>
      <NavLink to="/purchase">Buy Stock</NavLink>
      <a onClick={logOut}>Log Out</a>
    </nav>
  );
};

export default memo(Navigation);
