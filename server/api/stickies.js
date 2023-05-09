const express = require("express");
const app = express.Router();
const { Sticky } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

//get all stickies
app.get("/", async (req, res, next) => {
  try {
    res.send(await Sticky.findAll());
  } catch (ex) {
    next(ex);
  }
});

//add a sticky
app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const sticky = await Sticky.create(req.body);
    res.status(201).send(sticky);
  } catch (ex) {
    next(ex);
  }
});
