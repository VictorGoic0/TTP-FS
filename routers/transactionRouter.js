const router = require("express").Router();
const authorization = require("./authorization.js");

const db = require("../data/helpers/transactions-model.js");
const Users = require("../data/helpers/users-model.js");

// Only GET by id and POST will actually be used, the rest are here just in case/for testing.

router.get("/", async (req, res) => {
  try {
    const transactions = await db.find();
    if (transactions) {
      res.status(200).json(transactions);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Transaction could not be found ${error}.` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await db.findById(id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res
        .status(404)
        .json({ message: "Transaction with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Transaction request failed ${error}.` });
  }
});

router.post("/", authorization, async (req, res) => {
  const transaction = req.body;
  const { user_id, quantity, price, transaction_type } = transaction;
  const total = quantity * price;
  try {
    const newTransaction = await db.create(transaction);
    if (newTransaction) {
      const user = await Users.findById(user_id);
      if (transaction_type === "BUY") {
        const updatedUser = await Users.update(
          { balance: user.balance - total },
          user_id
        );
        if (updatedUser) {
          res.status(201).json(newTransaction);
        }
      } else if (transaction_type === "SELL") {
        const updatedUser = await Users.update(
          { balance: user.balance + total },
          user_id
        );
        if (updatedUser) {
          res.status(201).json(newTransaction);
        }
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Your transaction could not be completed ${error}.` });
  }
});

router.delete("/:id", authorization, async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await db.remove(id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({
        message: "The transaction with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The transaction's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", authorization, async (req, res) => {
  const { id } = req.params;
  const newTransaction = req.body;

  try {
    const editedTransaction = await db.update(newTransaction, id);
    if (editedTransaction) {
      res.status(200).json(editedTransaction);
    } else {
      res.status(404).json({
        message: "The transaction with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The transaction's information could not be modified: ${error}.`
    });
  }
});

module.exports = router;
