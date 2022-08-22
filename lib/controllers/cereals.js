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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Cereal.getById(req.params.id);
      if(!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Cereal.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
