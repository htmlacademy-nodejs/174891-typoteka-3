'use strict';

const {Router} = require(`express`);
const mainRouter = require(`./main-routes`);
const myRouter = require(`./my-routes.js`);
const articlesRouter = require(`./articles-routes`);

const app = new Router();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

module.exports = app;
