const { Hero, Image, Superpower } = require('../models');
const _ = require('lodash');

module.exports.createHero = async (req, res, next) => {
  try {
    const { body, files } = req;
    console.log(files);
    const filtr = _.pick(body, [
      'nickName',
      'realName',
      'originDescription',
      'catchPrase',
    ]);
    console.log(filtr);
    const hero = await Hero.create({ ...filtr });

    files.forEach((file) => hero.createImage({ imageSrc: file.filename }));

    res.send(files.map((file) => file.filename));

    // res.json({ message: 'Successfully uploaded files' });
  } catch (error) {
    next(error);
  }
};

// module.exports.createHero = async (req, res, next) => {
//   try {
//     const { body } = req;
//     console.log(req.files);
//     res.send(req.files);
//   } catch (error) {
//     next(error);
//   }
// };
