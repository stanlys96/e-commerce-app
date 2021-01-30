const express = require('express');
const router = express.Router();

const Controller = require('../controllers/Controller');

const mid = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/', mid, Controller.showHomePage);

module.exports = router;