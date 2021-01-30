const { Product, Customer, Order } = require('../models/index');

class Controller {
  static showHomePage(req, res) {
    res.render('homePage');
  }

  static showProductsPage(req, res) {
    Product
      .findAll({
        order: [
          ['id', 'ASC']
        ]
      })
      .then(products => {
        res.render('products', { products });
      })
      .catch(err => {
        res.send(err);
      })
  }

  static getRegisterPage(req, res) {
    res.render('register');
  }

  static postRegisterPage(req, res) {
    let { full_name, email, address, gender, phone_number, username, password } = req.body;
    let newCustomer = {
      full_name,
      email,
      address,
      gender,
      phone_number,
      username,
      password
    }

    console.log(req.body);

    Customer
      .create(newCustomer)
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        res.send(err);
      })
  }

  static getLoginPage(req, res) {
    res.render('login');
  }

  static getCustomerDetails(req, res) {
    res.render('customerDetails');
  }

  static getShoppingCartPage(req, res) {
    res.render('shoppingCart');
  }

  static getLogout(req, res) {

  }
}

module.exports = Controller;