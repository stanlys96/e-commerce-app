const express = require('express');
const router = express.Router();

const Controller = require('../controllers/Controller');

router.get('/', Controller.showProductsPage);

module.exports = router;