import React, { memo } from "react";

const Stock = props => {
  const { price } = props;
  const { symbol, quantity } = props.stock;
  // const { openingPrice } = props;
  return (
    // <div className={`stock ${price < openingPrice ? 'red' : price === openingPrice ? 'grey' : 'green'}`}>
    // Commented out due to defective endpoint for opening price
    <div className="stock">
      <h3>{symbol}</h3>
      <h3>{quantity} shares</h3>
      <h3>${(quantity * price).toFixed(2)}</h3>
    </div>
  );
};

export default memo(Stock);
