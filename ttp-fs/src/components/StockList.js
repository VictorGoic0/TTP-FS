import React, { memo } from "react";
import Stock from "./Stock";

const StockList = ({ stockList, prices }) => {
  return (
    <>
      {stockList.map(stock => (
        <Stock key={stock.id} stock={stock} price={prices[stock.symbol]} />
      ))}
    </>
  );
};

export default memo(StockList);
