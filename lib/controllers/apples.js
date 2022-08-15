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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Apple.getById(req.params.id);
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
      const data = await Apple.insert(req.body);
      res.json(data);
    } catch(e) {
      next(e);
    }
  });
