exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", table => {
      table.increments();
      table
        .string("email", 50)
        .notNullable()
        .unique();
      table.string("name", 50).notNullable();
      table.string("password", 100).notNullable();
      table.float("balance").defaultTo(5000);
      table.timestamps(true, true);
    })
    .createTable("transactions", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("transaction_type", 6).notNullable();
      table.string("symbol", 10).notNullable();
      table.string("sector", 30).notNullable();
      table.string("security_type", 30).notNullable();
      table.float("price").notNullable();
      table.integer("quantity").notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
