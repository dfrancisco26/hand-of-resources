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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await NewGame.getById(req.params.id);
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
      const data = await NewGame.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
