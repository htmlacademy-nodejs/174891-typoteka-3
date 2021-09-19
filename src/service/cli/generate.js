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
const INTERVAL_IN_MONTH = 3;

const Count = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
};

const AnnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const Path = {
  FILE_SENTENCES_PATH: `./data/sentences.txt`,
  FILE_TITLES_PATH: `./data/titles.txt`,
  FILE_CATEGORIES_PATH: `./data/categories.txt`,
};

const generateOffers = async (count) => {
  const [categories, sentences, titles] = await Promise.all([
    Utils.readContent(Path.FILE_CATEGORIES_PATH),
    Utils.readContent(Path.FILE_SENTENCES_PATH),
    Utils.readContent(Path.FILE_TITLES_PATH),
  ]);

  return Array(count).fill({}).map(() => ({
    title: generateTitle(titles),
    announce: generateAnnounce(sentences, AnnounceRestrict.MIN, AnnounceRestrict.MAX),
    fullText: generateFullText(sentences),
    createdDate: generateDate(INTERVAL_IN_MONTH),
    category: generateCategory(categories),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || Count.DEFAULT_COUNT;
    if (countOffer > Count.MAX_COUNT) {
      return console.info(`Not more than 1000 offers`);
    }

    return Utils.writeJSONFile(FILE_NAME, await generateOffers(countOffer));
  }
};
