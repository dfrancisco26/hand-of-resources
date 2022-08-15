const { Router } = require('express');
const { Apple } = require('../models/Apple');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const data = await Apple.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
