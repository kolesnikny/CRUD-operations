const { Hero } = require('../models');

module.exports.createHero = async (req, res, next) => {
  try {
    const { body, files } = req;
    console.log(files);
    console.log(body);
    res.send(req.files);
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
