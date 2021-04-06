'use strict';

const {
  getRandomInt,
  shuffle,
  writeJSONFile,
} = require(`./utils`);

const {
  generateCategory,
  generateTitle,
  generateAnnounce,
  generateFullText,
  generateDate
} = require(`./generatePublications`);

module.exports = {
  getRandomInt,
  shuffle,
  writeJSONFile,
  generateCategory,
  generateTitle,
  generateAnnounce,
  generateFullText,
  generateDate
};
