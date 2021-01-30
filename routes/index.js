const express = require('express');
const router = express.Router();

const Controller = require('../controllers/Controller');

const customersRoutes = require('./customers');
const ordersRoutes = require('./orders');
const productsRoutes = require('./products');
const orderDetails = require('./orderDetails');
const registerRoutes = require('./register');
const loginRoutes = require('./login');
const shoppingCartRoutes = require('./shoppingCart');
const logoutRoutes = require('./logout');

router.get('/', Controller.showHomePage);
router.use('/customerdetails', customersRoutes);
router.use('/products', productsRoutes);
router.use('/register', registerRoutes);
router.use('/login', loginRoutes);
router.use('/shoppingcart', shoppingCartRoutes);
router.use('/logout', logoutRoutes);

module.exports = router;