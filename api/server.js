const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const authRouter = require("../routers/authRouter.js");
const transactionRouter = require("../routers/transactionRouter.js");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/transactions", transactionRouter);

module.exports = server;
