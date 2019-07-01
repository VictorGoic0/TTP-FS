const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const authorization = require("../routers/authorization.js");
const authRouter = require("../routers/authRouter.js");
const transactionRouter = require("../routers/transactionRouter.js");
const usersRouter = require("../routers/usersRouter.js");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/transactions", transactionRouter);
server.use("/api/users", authorization, usersRouter);

server.get("/", (req, res) => {
  res.status(200).send("API is up and running.");
});

module.exports = server;
