const express = require('express');
const router = express.Router();

const Controller = require('../controllers/Controller');

router.get('/', Controller.getRegisterPage);
router.post('/', Controller.postRegisterPage);

module.exports = router;