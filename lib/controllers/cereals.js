const { Router } = require('express');
const { Cereal } = require('../models/Cereal');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const data = await Cereal.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
