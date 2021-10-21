'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const FILENAME = `mocks.json`;
let data = [];

const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.error(chalk.red(`Ошибка чтения файла ${FILENAME}`));
  }

  return data;
};

module.exports = {
  getMockData,
};
