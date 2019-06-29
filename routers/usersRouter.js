const router = require("express").Router();
const db = require("../data/helpers/users-model.js");
const Transactions = require("../data/helpers/transactions-model.js");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "User with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `User request failed ${error}.` });
  }
});

router.get("/:id/transactions", async (req, res) => {
  const { id } = req.params;
  try {
    const transactions = await Transactions.findByUser(id);
    if (transactions) {
      res.status(200).json(transactions);
    } else {
      res
        .status(404)
        .json({ message: "User with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `User request failed ${error}.` });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.remove(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      message: `The user's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const editedUser = await db.update(req.body, id);
    if (editedUser) {
      res.status(200).json(editedUser);
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The user's information could not be modified: ${error}.`
    });
  }
});

module.exports = router;
