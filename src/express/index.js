'use strict';

const express = require(`express`);
const path = require(`path`);
const router = require(`./routes`);
const {getLogger} = require(`../service/lib/logger`);
const {HttpCode} = require(`../constants`);

const DEFAULT_PORT = 8080;

const Dirname = {
  PUBLIC_DIR: `public`,
  UPLOAD_DIR: `upload`,
  TEMPLATES: `templates`
};

const app = express();
const logger = getLogger({name: `api`});

app.use(express.static(path.resolve(__dirname, Dirname.PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, Dirname.UPLOAD_DIR)));

app.use(router);

app.set(`views`, path.resolve(__dirname, Dirname.TEMPLATES));
app.set(`view engine`, `pug`);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).render(`errors/404`);
});

app.use((err, req, res) => {
  logger.error(`Ошибка: ${err}`);
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
});

app.listen(DEFAULT_PORT, () => logger.info(`Сервер запущен на порту ${DEFAULT_PORT}`));
