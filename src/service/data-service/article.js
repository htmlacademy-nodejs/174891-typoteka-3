"use strict";

const Aliase = require(`../models/aliase`);

class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
  }

  async findAll(needComments) {
    const include = [Aliase.CATEGORIES];
    if (needComments) {
      include.push(Aliase.COMMENTS);
    }
    const articles = await this._Article.findAll({include});
    return articles.map((item) => item.get());
  }

  findOne(id, needComments) {
    const include = [Aliase.CATEGORIES];
    if (needComments) {
      include.push(Aliase.COMMENTS);
    }
    return this._Article.findByPk(id, {include});
  }

  async create(articleData) {
    const article = await this._Article.create(articleData);
    await article.addCategories(articleData.categories);

    return article.get();
  }

  async findPage({offset, limit, comments}) {
    const include = [Aliase.CATEGORIES];
    if (comments) {
      include.push(Aliase.COMMENTS);
    }
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include,
      order: [
        [`createdAt`, `DESC`]
      ],
      distinct: true
    });
    return {count, articles: rows};
  }

  async update(id, article) {
    const [updatedArticle] = await this._Article.update(article, {
      where: {id}
    });
    return !!updatedArticle;
  }

  async delete(id) {
    const deletedArticle = await this._Article.destroy({
      where: {id}
    });
    return !!deletedArticle;
  }
}

module.exports = ArticleService;
