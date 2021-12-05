'use strict';

const {Router} = require(`express`);
const category = require(`../api/category`);
const search = require(`../api/search`);
const article = require(`../api/article`);
const ArticleService = require(`../data-service/article`);
const CategoryService = require(`../data-service/category`);
const SearchService = require(`../data-service/search`);
const CommentService = require(`../data-service/comment`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const apiRouter = new Router();

defineModels(sequelize);

(async () => {
  article(apiRouter, new ArticleService(sequelize), new CommentService(sequelize));
  category(apiRouter, new CategoryService(sequelize));
  search(apiRouter, new SearchService(sequelize));
})();

module.exports = apiRouter;
