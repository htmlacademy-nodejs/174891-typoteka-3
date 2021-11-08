'use strict';

const {Utils: Utils} = require(`./utils`);

const generateCategory = (categories) => {
  return Array.of(categories[Utils.getRandomInt(0, categories.length - 1)]);
};

const generateTitle = (titles) => {
  return titles[Utils.getRandomInt(0, titles.length - 1)];
};

const generateAnnounce = (sentences, minCount, maxCount) => {
  return Utils.shuffle(sentences).slice(minCount, maxCount).join(` `);
};

const generateFullText = (sentences) => {
  return generateAnnounce(sentences, 1, sentences.length - 1);
};

const generateDate = (monthInterval) => {
  const now = new Date();
  const beforeNow = (new Date(now)).setMonth(now.getMonth() - monthInterval);
  return new Date(Utils.getRandomInt(beforeNow.valueOf(), now.valueOf())).toJSON();
};

module.exports = {
  generateCategory,
  generateTitle,
  generateAnnounce,
  generateDate,
  generateFullText,
};
