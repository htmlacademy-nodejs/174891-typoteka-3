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
    --filldb              заполняет базу данных
    --server <port>       запускает сервер
    --fill                заполняет fill-db.sql`
    );
  }
};
