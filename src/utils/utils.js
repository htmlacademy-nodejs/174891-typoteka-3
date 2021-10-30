'use strict';

const {getLogger} = require(`../lib/logger`);

const fs = require(`fs`).promises;

const logger = getLogger({name: `api`});

class Utils {
  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static shuffle(someArray) {
    for (let i = someArray.length - 1; i > 0; i--) {
      const randomPosition = Math.floor(Math.random() * i);
      [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
    }

    return someArray;
  }

  static async readContent(filePath) {
    try {
      const content = await fs.readFile(filePath, `utf-8`);
      return content.trim().split(`\n`);
    } catch (err) {
      logger.error(err);
      return [];
    }
  }

  static async writeJSONFile(fileName, data) {
    try {
      await fs.writeFile(fileName, JSON.stringify(data));
      logger.info(`Operation success. File created.`);
    } catch (err) {
      logger.error(`Can't write data to file, ${err}`);
      throw err;
    }
  }
}

module.exports = {
  Utils
};
