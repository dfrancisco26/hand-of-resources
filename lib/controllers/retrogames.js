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
    
  });
