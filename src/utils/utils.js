'use strict';

const fs = require(`fs`).promises;

const chalk = require(`chalk`);

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
      const content = await fs.readFile(filePath, `utf8`);
      return content.trim().split(`\n`);
    } catch (err) {
      console.error(chalk.red(err));
      return [];
    }
  }

  static async writeJSONFile(fileName, data) {
    try {
      const content = JSON.stringify(data);
      await fs.writeFile(fileName, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file, ${err}`));
      throw err;
    }
  }
}

module.exports = {
  Utils
};
