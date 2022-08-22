const { Router } = require('express');
const { RetroGame } = require('../models/RetroGame');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const data = await RetroGame.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await RetroGame.getById(req.params.id);
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
      const data = await RetroGame.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  
  .put('/:id', async (req, res, next) => {
    try {
      const data = await RetroGame.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const data = await RetroGame.delete(req.params.id);
      res.json(data);
    } catch(e) {
      next(e);
    }
  });
