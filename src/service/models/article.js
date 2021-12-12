'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Article extends Model {}

const define = (sequelize) => Article.init({
  title: {
    type: DataTypes.STRING,
  },
  announce: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  picture: DataTypes.STRING
}, {
  sequelize,
  modelName: `Article`,
  tableName: `articles`
});

module.exports = define;
