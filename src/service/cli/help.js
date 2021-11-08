'use strict';

const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api`});

module.exports = {
  name: `--help`,
  run() {
    logger.info(`
    Программа запускает http-сервер и формирует файл с данными для API.
    Гайд:
    server <command>
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
    --fill   заполняет fill-db.sql`
    );
  }
};
