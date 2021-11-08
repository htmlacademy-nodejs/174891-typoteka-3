'use strict';

const chalk = require(`chalk`);
const {
  Utils,
  generateTitle,
  generateAnnounce,
  generateCategory,
  generateFullText
} = require(`../../utils`);

const DEFAULT_COUNT = 1;

const FILE_NAME = `fill-db.sql`;

const Path = {
  FILE_SENTENCES_PATH: `./data/sentences.txt`,
  FILE_TITLES_PATH: `./data/titles.txt`,
  FILE_CATEGORIES_PATH: `./data/categories.txt`,
  FILE_COMMENTS_PATH: `./data/comments.txt`
};

const generateComments = (articleId, userCount, comments) => {

  const count = Utils.getRandomInt(1, comments.length);
  return Array(count).fill({}).map(() => ({
    userId: Utils.getRandomInt(1, userCount),
    text: Utils.shuffle(comments)
      .slice(0, Utils.getRandomInt(1, 3))
      .join(` `),
  }));
};

const generateArticles = (count, titles, categories, userCount, sentences, comments) => {

  return Array(count).fill({}).map((_, index) => ({
    userId: Utils.getRandomInt(1, userCount),
    title: generateTitle(titles),
    announce: generateAnnounce(sentences, 0, 4),
    fullText: generateFullText(sentences),
    category: generateCategory(categories),
    comments: generateComments(index + 1, userCount, comments)
  }));
};

module.exports = {
  name: `--fill`,
  async run(args) {
    const [categories, sentences, titles, commentSentences] = await Promise.all([
      Utils.readContent(Path.FILE_CATEGORIES_PATH),
      Utils.readContent(Path.FILE_SENTENCES_PATH),
      Utils.readContent(Path.FILE_TITLES_PATH),
      Utils.readContent(Path.FILE_COMMENTS_PATH),
    ]);

    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const users = [
      {
        email: `ivanov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Иван`,
        lastName: `Иванов`,
        avatar: `avatar1.jpg`
      },
      {
        email: `petrov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Пётр`,
        lastName: `Петров`,
        avatar: `avatar2.jpg`
      }
    ];


    const articles = generateArticles(countArticles, titles, categories.length, users.length, sentences, commentSentences);

    const comments = articles.flatMap((article) => article.comments);

    const articleCategories = articles.map((article, index) => ({articleId: index + 1, categoryId: categories.indexOf(article.category[0]) + 1}));

    const userValues = users.map(
        ({email, passwordHash, firstName, lastName, avatar}) =>
          `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`
    ).join(`,\n`);

    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

    const articleValues = articles.map(
        ({title, announce, fullText, picture, userId}) =>
          `('${title}', '${announce}', '${fullText}', '${picture}', ${userId})`
    ).join(`,\n`);

    const articleCategoryValues = articleCategories.map(
        ({articleId, categoryId}) =>
          `(${articleId}, ${categoryId})`
    ).join(`,\n`);

    const commentValues = comments.map(
        ({text, userId, articleId}) =>
          `('${text}', ${userId}, ${articleId})`
    ).join(`,\n`);

    const content = `
INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
${userValues};
INSERT INTO categories(name) VALUES
${categoryValues};
ALTER TABLE offers DISABLE TRIGGER ALL;
INSERT INTO articles(title, announce, fullText, picture, user_id) VALUES
${articleValues};
ALTER TABLE article ENABLE TRIGGER ALL;
ALTER TABLE article_categories DISABLE TRIGGER ALL;
INSERT INTO article_categories(article_id, category_id) VALUES
${articleCategoryValues};
ALTER TABLE article_categories ENABLE TRIGGER ALL;
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(text, user_id, article_id) VALUES
${commentValues};
ALTER TABLE comments ENABLE TRIGGER ALL;`;

    try {
      await Utils.writeJSONFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
