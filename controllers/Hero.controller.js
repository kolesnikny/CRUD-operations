const { Hero, Image, Superpower } = require('../models');
const _ = require('lodash');
const createError = require('http-errors');

const addImages = (images, heroInstance) => {
  [...images].forEach(
    async (image) =>
      await heroInstance.createImage({ imageSrc: image.filename })
  );
};

const addSuperpowers = (powers, heroInstance) => {
  [...powers].forEach(async (powerid) => {
    const powerInstance = await Superpower.findByPk(Number(powerid));
    heroInstance.addSuperpower(powerInstance);
  });
};

module.exports.createHero = async (req, res, next) => {
  try {
    const {
      body,
      body: { superpowers },
      files,
    } = req;
    const filtr = _.pick(body, [
      'nickName',
      'realName',
      'originDescription',
      'catchPrase',
    ]);
    const heroInstance = await Hero.create({ ...filtr });

    addImages(files, heroInstance);

    addSuperpowers(superpowers, heroInstance);

    res.json({ message: 'Successfully uploaded files' });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteHero = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const deletedHero = await Hero.findOne({
      where: {
        id: Number(id),
      },
    });
    deletedHero.destroy();
    res.status(200).send(deletedUser);
  } catch (error) {
    next(error);
  }
};

module.exports.updateHero = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  console.log(id);
  try {
    const updatedUser = await Hero.findOne({
      where: {
        id: Number(id),
      },
    });
    deletedUser.destroy();
    res.status(200).send(deletedUser);
  } catch (error) {
    next(error);
  }
};

module.exports.getOneHero = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const currentHero = await Hero.findByPk(Number(id));
    if (!currentHero) {
      const err = createError(404, 'Hero not found!');
      return next(err);
    }

    res.status(200).send(currentHero);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllHeroes = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const arrayHeroes = await Hero.findAll({ ...pagination });
    res.status(200).send({ data: arrayHeroes });
  } catch (error) {
    next(error);
  }
};
