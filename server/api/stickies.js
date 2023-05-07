const express = require('express');
const app = express.Router();
const { Sticky } = require('../db');
const { isLoggedIn } = require('./middleware');

module.exports = app;

//get all public stickies
app.get('/', async(req, res, next) => {
  try {
    res.send(await Sticky.findAll({
      where: {
        isPublic: true
      }
    }))
  }
  catch(ex) {
    next(ex)
  }
})

//get the logged-in user's stickies
app.get('/user', isLoggedIn, async(req, res, next)=> {
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