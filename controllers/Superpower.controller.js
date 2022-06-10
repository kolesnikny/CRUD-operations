const { Superpower } = require('../models');
const _ = require('lodash');

module.exports.createSuperpower = async (req, res, next) => {
  try {
    const { body } = req;
    const filtr = _.pick(body, ['superpower']);
    console.log(filtr.superpower);
    const superpower = await Superpower.create({ ...filtr });

    res.json({ message: 'Successfully added power' });
  } catch (error) {
    next(error);
  }
};
