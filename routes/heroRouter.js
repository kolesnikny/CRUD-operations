const { Router } = require('express');
const HeroController = require('../controllers/Hero.controller');
const multer = require('multer');
const pagination = require('../mw/pagination.mw');
const { STATIC_PATH } = require('../config');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(STATIC_PATH, 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({ storage });

const heroRouter = Router();

heroRouter.post('/', upload.array('files'), HeroController.createHero);

heroRouter.get('/', (req, res) => {
  res.send('hello from wsl');
});

module.exports = heroRouter;
