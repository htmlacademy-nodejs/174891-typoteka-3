'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (requiredKeys) => (req, res, next) => {
  const newObj = req.body;
  const keys = Object.keys(newObj);
  const keysExists = requiredKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
