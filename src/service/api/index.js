'use strict';

const {Router} = require(`express`);
const createCategoriesRoute = require(`src/service/api/category`);
const createSearchRoute = require(`src/service/api/search`);
const createArticleRoute = require(`src/service/api/articles`);
const ArticleService = require(`../data-service/article`);
const CategoryService = require(`../data-service/category`);
const SearchService = require(`../data-service/search`);
const CommentService = require(`../data-service/comment`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

defineModels(sequelize);

const createRouter = async () => {
  const apiRouter = new Router();

  apiRouter.use(`/articles`, createArticleRoute(new ArticleService(sequelize), new CommentService(sequelize)));
  apiRouter.use(`/categories`, createCategoriesRoute(new CategoryService(sequelize)));
  apiRouter.use(`/search`, createSearchRoute(new SearchService(sequelize)));

  return apiRouter;
};

module.exports = createRouter;
