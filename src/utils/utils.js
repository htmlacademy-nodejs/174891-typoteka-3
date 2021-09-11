'use strict';

const fs = require(`fs`);

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

  static writeJSONFile(fileName, data) {
    try {
      const content = JSON.stringify(data);
      fs.writeFileSync(fileName, content);
      console.info(`Operation success. File created.`);
    } catch (err) {
      console.error(`Can't write data to file, ${err}`);
      throw err;
    }
  }
}

module.exports = {
  Utils
};
