import React, { memo } from "react";
import Transaction from "./Transaction";

const TransactionList = ({ transactions }) => {
  return (
    <div className="transactions">
      <h1>Transactions</h1>
      {transactions.map(transaction => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default memo(TransactionList);
