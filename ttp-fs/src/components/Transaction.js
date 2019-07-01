import React, { memo } from "react";

const Transaction = props => {
  const { symbol, quantity, price } = props.transaction;
  return (
    <div>
      <h3>{symbol}</h3>
      <h3>
        {quantity} shares @ {price}
      </h3>
    </div>
  );
};

export default memo(Transaction);