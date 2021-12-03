'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {ensureArray} = require(`../../utils`);

const UPLOAD_DIR = `../upload/img/`;

const articlesRouter = new Router();

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));

articlesRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id, true);
  res.render(`articles/post-detail`, {article});
});

articlesRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const articleData = {
    picture: file ? file.filename : ``,
    title: body.title,
    categories: ensureArray(body.categories),
    announce: body.announce,
    fullText: body.fullText
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`back`);
  }
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);

  res.render(`articles/post`, {article, categories});
});

articlesRouter.post(`/edit/:id`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;
  const {id} = req.params;
  const article = await api.getArticle(id);
  const updateArticle = {
    title: body.title,
    announce: body.announcement,
    fullText: body.fullText,
    categories: ensureArray(body.categories),
  };

  if (file) {
    updateArticle.picture = file.filename;
  }
  const articleData = Object.assign(article, updateArticle);
  try {
    await api.updateArticle(articleData, id);
    res.redirect(`/my`);
  } catch (error) {
    console.error(error.message);
    res.redirect(`back`);
  }
});

module.exports = articlesRouter;
