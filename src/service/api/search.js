'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

module.exports = (searchService) => {
  const route = new Router();

  route.get(`/`, (req, res) => {
    const {query: searchText = ``} = req.query;

    if (!searchText) {
      res.status(HttpCode.BAD_REQUEST).json([]);
      return;
    }

    const searchResults = searchService.searchOffers(searchText);

    res.status(HttpCode.OK).json(searchResults);
  });

  return route;
};
