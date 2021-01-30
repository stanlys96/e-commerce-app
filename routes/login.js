const express = require('express');
const router = express.Router();

const Controller = require('../controllers/Controller');

router.get('/', Controller.getLoginPage);
router.post('/', Controller.postLoginPage);

module.exports = router;