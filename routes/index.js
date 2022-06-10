const { Router } = require('express');
const heroRouter = require('./heroRouter');
const superpowerRouter = require('./superpowerRoute');

const router = Router();

router.use('/heroes', heroRouter);
router.use('/superpowers', superpowerRouter);

module.exports = router;
