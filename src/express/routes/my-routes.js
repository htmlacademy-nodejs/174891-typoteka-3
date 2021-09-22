'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.send(`my-publications`));
myRouter.get(`/comments`, (req, res) => res.send(`comments`));

module.exports = myRouter;
