import React, { memo } from "react";

const Stock = props => {
  const { price } = props;
  const { symbol, quantity } = props.stock;
  return (
    <div>
      <h3>{symbol}</h3>
      <h3>{quantity} shares</h3>
      <h3>${quantity * price}</h3>
    </div>
  );
};

export default memo(Stock);
