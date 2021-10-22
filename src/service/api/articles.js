'use strict';

const {Router} = require(`express`);
const {HttpCode, KeysForValidation} = require(`../../constants`);

const articleValidator = require(`../middlewares/article-validator`);
const articleExist = require(`../middlewares/article-exist`);

module.exports = (articleService, commentService) => {
  const route = new Router();

  route.get(`/`, (req, res) => {
    return res.status(HttpCode.OK).json(articleService.findAll());
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  });

  route.post(`/`, articleValidator(KeysForValidation.ARTICLE), (req, res) => {
    const newArticle = articleService.create(req.body);

    return res.status(HttpCode.CREATED).json(newArticle);
  });

  route.put(`/:articleId`, articleExist(articleService), (req, res) => {
    const updatedArticle = articleService.update(res.locals.article, req.body);

    return res.status(HttpCode.OK).json(updatedArticle);
  });

  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.delete(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), articleValidator(KeysForValidation.COMMENT)], (req, res) => {
    const {article} = res.locals;
    const newComment = commentService.create(article, req.body);

    return res.status(HttpCode.CREATED).json(newComment);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;

    const deletedComment = commentService.delete(article, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(deletedComment);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;

    const comments = commentService.findAll(article);

    return res.status(HttpCode.OK).json(comments);
  });

  return route;
};
