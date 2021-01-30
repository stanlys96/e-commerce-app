const express = require('express');
const router = express.Router();

const Controller = require('../controllers/Controller');

const mid = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/', mid, Controller.getCustomerDetails);
router.post('/', Controller.postCustomerDetails);

module.exports = router;