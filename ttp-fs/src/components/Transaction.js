import React, { memo } from "react";

const Transaction = props => {
  const { symbol, quantity, price, transaction_type } = props.transaction;
  return (
    <div className="transaction">
      {transaction_type === "BUY" ? (
        <h3>BUY ({symbol})</h3>
      ) : (
        <h3>SELL ({symbol})</h3>
      )}
      <h3>
        {quantity} shares @ {price.toFixed(2)}
      </h3>
    </div>
  );
};

export default memo(Transaction);
