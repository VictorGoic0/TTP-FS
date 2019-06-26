require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_DEV_HOST || "localhost",
      database: process.env.DB_DEV_DATABASE || "rxid",
      user: process.env.DB_DEV_USER || "admin",
      password: process.env.DB_DEV_PASSWORD || "pass",
      port: process.env.DB_DEV_PORT || "5432"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.DB_PROD_HOST || "localhost",
      database: process.env.DB_PROD_DATABASE || "rxid",
      user: process.env.DB_PROD_USER || "admin",
      password: process.env.DB_PROD_PASSWORD || "pass",
      port: process.env.DB_PROD_PORT || "5432"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
