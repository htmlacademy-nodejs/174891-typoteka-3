'use strict';

const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;

const MAX_ID_LENGTH = 6;

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

const KeysForValidation = {
  ARTICLE: [`title`, `announce`, `fullText`, `categories`],
  COMMENT: [`text`],
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  MAX_ID_LENGTH,
  ExitCode,
  HttpCode,
  KeysForValidation,
  Env
};
