const { Hero, Image, Superpower } = require('../models');
const _ = require('lodash');

const addImages = (images, heroInstance) => {
  images.forEach(
    async (image) =>
      await heroInstance.createImage({ imageSrc: image.filename })
  );
};

const addSuperpowers = (powers, heroInstance) => {
  powers.forEach(async (powerid) => {
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

module.exports.updateHero;
