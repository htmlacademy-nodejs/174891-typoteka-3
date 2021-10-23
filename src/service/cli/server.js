'use strict';

const {HttpCode} = require(`../../constants`);

const createRouter = require(`../api`);
const chalk = require(`chalk`);
const express = require(`express`);

const DEFAULT_PORT = 3000;
const API_PREFIX = `/api`;

const createServer = async (port) => {
  const server = express();
  const apiRouter = await createRouter();

  server.use(express.json());

  server.use(API_PREFIX, apiRouter);
  server.use((req, res) => {
    res.status(HttpCode.NOT_FOUND).send(`Not found`);
  });
  server.listen(port, () => console.info(chalk.blue(`Принимаю подключения на порт ${port}`)));
};


module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    createServer(Number.parseInt(customPort, 10) || DEFAULT_PORT);
  }
};
