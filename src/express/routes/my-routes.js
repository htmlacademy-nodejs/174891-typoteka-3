'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

const api = require(`../api`).getAPI();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles({comments: true});
  res.render(`my`, {articles});
});

myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles({comments: true});
  res.render(`comments`, {articles: articles.slice(0, 3)});
});

module.exports = myRouter;
