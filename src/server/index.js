require("dotenv").config();
const debug = require("debug")("items:server");
const chalk = require("chalk");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const getItems = require("./controllers/getItems");
const login = require("./controllers/login");
const register = require("./controllers/register");
const auth = require("./middlewares/auth");
const { notFoundError, generalError } = require("./middlewares/errors");

const app = express();

const startServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server listening on http://localhost:${port}`));
      resolve();
    });

    server.on("error", (error) => {
      reject(error);
    });
  });

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.post("/users/register", register);
app.post("/users/login", login);
app.get("/items/list", auth, getItems);

app.use(notFoundError);
app.use(generalError);

module.exports = startServer;
