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
heroRouter.delete('/:id', upload.array('files'), HeroController.deleteHero);
heroRouter.get('/all', HeroController.getAllHeroes);
heroRouter.get('/:id', HeroController.getOneHero);

module.exports = heroRouter;
