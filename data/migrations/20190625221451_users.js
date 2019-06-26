
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable("users", table => {
      table.increments();
      table
        .string("email", 50)
        .notNullable()
        .unique();
        table.string("name", 50)
        .notNullable();
      table.string("password", 100).notNullable();
      table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users")
};
