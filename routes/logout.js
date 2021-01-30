const express = require('express');
const router = express.Router();

const Controller = require('../controllers/Controller');

const mid = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/');
  }
}

router.get('/', mid, Controller.getLogout);

module.exports = router;