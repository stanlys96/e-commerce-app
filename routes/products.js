const express = require('express');
const router = express.Router();

const Controller = require('../controllers/Controller');

router.get('/', Controller.showProductsPage);
router.post('/:productId', Controller.postProduct);

module.exports = router;