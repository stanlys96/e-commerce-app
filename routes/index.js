const express = require('express');
const router = express.Router();

const Controller = require('../controllers/Controller');

const customersRoutes = require('./customers');
const ordersRoutes = require('./orders');
const productsRoutes = require('./products');
const orderDetails = require('./orderDetails');
const registerRoutes = require('./register');
const loginRoutes = require('./login');

router.get('/', Controller.showHomePage);
router.use('/customers', customersRoutes);
router.use('/products', productsRoutes);
router.use('/register', registerRoutes);
router.use('/login', loginRoutes);

module.exports = router;