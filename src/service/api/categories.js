'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

module.exports = (service) => {
  const route = new Router();

  route.get(`/`, (req, res) => {
    const categories = service.findAll();
    res.status(HttpCode.OK).json(categories);
  });

  return route;
};
