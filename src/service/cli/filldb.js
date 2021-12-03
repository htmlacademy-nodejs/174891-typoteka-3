'use strict';

const {
  generateTitle,
  generateDate,
  generateFullText,
  generateAnnounce,
  Utils
} = require(`../../utils/index`);

const {getLogger} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const initDatabase = require(`../lib/init-db`);

const {ExitCode} = require(`../../constants`);

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
  FILE_COMMENTS_PATH: `./data/comments.txt`
};

const generateComments = (comments, users) => {
  const count = Utils.getRandomInt(1, comments.length);
  return Array(count).fill({}).map(() => ({
    user: users[Utils.getRandomInt(0, users.length - 1)].email,
    text: Utils.shuffle(comments)
      .slice(0, Utils.getRandomInt(1, comments.length))
      .join(` `),
  }));
};

const generateOffers = async (count, [sentences, titles, categories, comments]) => {


  return Array(count).fill({}).map(() => ({
    title: generateTitle(titles),
    announce: generateAnnounce(sentences, AnnounceRestrict.MIN, AnnounceRestrict.MAX),
    fullText: generateFullText(sentences),
    createdDate: generateDate(INTERVAL_IN_MONTH),
    categories: Utils.getRandomSubarray(categories),
    comments: generateComments(comments)
  }));
};

const logger = getLogger();

module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(ExitCode.ERROR);
    }

    logger.info(`The connection to database is established`);

    const data = await Promise.all([
      Utils.readContent(Path.FILE_CATEGORIES_PATH),
      Utils.readContent(Path.FILE_SENTENCES_PATH),
      Utils.readContent(Path.FILE_TITLES_PATH),
      Utils.readContent(Path.FILE_COMMENTS_PATH),
    ]);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || Count.DEFAULT_COUNT;

    const articles = generateOffers(countOffer, data);
    const categories = data[2];

    return initDatabase(sequelize, {articles, categories});
  }
};

