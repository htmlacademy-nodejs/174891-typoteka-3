'use strict';

const express = require(`express`);
const path = require(`path`);
const router = require(`./routes`);

const DEFAULT_PORT = 8080;

const Dirname = {
  PUBLIC_DIR: `public`,
  TEMPLATES: `templates`
};

const app = express();

app.use(express.static(path.resolve(__dirname, Dirname.PUBLIC_DIR)));
app.use(router);

app.set(`views`, path.resolve(__dirname, Dirname.TEMPLATES));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT);
