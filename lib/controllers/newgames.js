const { Router } = require('express');
const { NewGame } = require('../models/NewGame');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await NewGame.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
