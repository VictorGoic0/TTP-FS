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
  return db("users");
}

async function findById(id) {
  return db("users")
    .where({ "users.id": id })
    .first();
}

async function findByUser(email) {
  return db("users")
    .where({ email })
    .first();
}

async function create(user) {
  const newUser = await db("users")
    .insert(user)
    .returning("*");
  return newUser["0"];
}

async function remove(id) {
  const [deletedUser] = await db("users")
    .where({ id })
    .del()
    .returning("*");
  return deletedUser;
}

async function update(updates, id) {
  const [editedUser] = await db("users")
    .where({ id })
    .update(updates).returning("*")
  return editedUser;
}
