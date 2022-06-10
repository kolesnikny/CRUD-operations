const { Router } = require('express');
const PowerController = require('../controllers/Superpower.controller');

const powerRouter = Router();

powerRouter.post('/', PowerController.createSuperpower);

powerRouter.get('/', (req, res) => {
  res.send('hello from wsl');
});

module.exports = powerRouter;
