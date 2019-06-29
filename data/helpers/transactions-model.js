const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  findByUser,
  create,
  remove,
  update
};

async function find() {
  return db("transactions");
}

async function findById(id) {
  return db("transactions")
    .where({ id })
    .first();
}

async function findByUser(user_id) {
  return db("transactions").where({ "transactions.user_id": user_id });
}

async function create(transaction) {
  const newTransaction = await db("transactions")
    .insert(transaction)
    .returning("*");
  return newTransaction["0"];
}

async function remove(id) {
  const [deletedTransaction] = await db("transactions")
    .where({ id })
    .del()
    .returning("*");
  return deletedTransaction;
}

async function update(updates, id) {
  const [editedTransaction] = await db("transactions")
    .where({ id })
    .update(updates);
  return editedTransaction;
}
