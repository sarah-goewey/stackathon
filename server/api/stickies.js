const express = require('express');
const app = express.Router();
const { Sticky } = require('../db');
const { isLoggedIn } = require('./middleware');

module.exports = app;

app.get('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await Sticky.findAll({
      where: {
        userId: req.user.id
      }
    })); 
  }
  catch(ex){
    next(ex);
  }
});