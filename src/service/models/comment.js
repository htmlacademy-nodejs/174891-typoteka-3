"use strict";

const {DataTypes, Model} = require(`sequelize`);

class Comment extends Model {}

const define = (sequelize) => Comment.init({
  text: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: `Comments`,
  tableName: `comments`
});

module.exports = define;
