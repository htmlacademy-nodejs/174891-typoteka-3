'use strict';

const {
  generateCategory,
  generateTitle,
  generateDate,
  generateFullText,
  generateAnnounce,
  Utils
} = require(`../../utils/index`);

const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const INTERVAL_IN_MONTH = 3;

const Count = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
};

const AnnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: generateTitle(titles),
    announce: generateAnnounce(sentences, AnnounceRestrict.MIN, AnnounceRestrict.MAX),
    fullText: generateFullText(sentences),
    createdDate: generateDate(INTERVAL_IN_MONTH),
    category: generateCategory(categories),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await Utils.readContent(FILE_SENTENCES_PATH);
    const titles = await Utils.readContent(FILE_TITLES_PATH);
    const categories = await Utils.readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || Count.DEFAULT_COUNT;
    if (countOffer > Count.MAX_COUNT) {
      return console.info(`Not more than 1000 offers`);
    }

    return Utils.writeJSONFile(FILE_NAME, JSON.stringify(generateOffers(countOffer, titles, categories, sentences)));
  }
};
