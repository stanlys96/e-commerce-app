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

  static postLoginPage(req, res) {
    let { username, password } = req.body;
    Customer
      .findOne({
        where: {
          username
        }
      })
      .then(customers => {
        if (customers.username === username && customers.password === password) {
          req.session.username = customers.username;
          res.redirect('/customerdetails');
        }
      })
      .catch(err => {
        res.send(err);
      })
  }

  static getCustomerDetails(req, res) {
    let username = req.session.username;
    Customer
      .findOne({
        where: {
          username
        }
      })
      .then(customer => {
        res.render('customerDetails', { customer });
      })
      .catch(err => {
        res.send(err);
      })
  }

  static postCustomerDetails(req, res) {
    let username = req.session.username;
    let { full_name, email, address, phone_number, password } = req.body;
    Customer
      .update({
        full_name,
        email,
        address,
        phone_number,
        password
      }, {
        where: {
          username
        }
      })
      .then(() => {
        res.redirect('/customerdetails');
      })
      .catch(err => {
        res.send(err);
      })
  }

  static getShoppingCartPage(req, res) {
    let products2;
    let price;
    if (req.session.products) {
      products2 = req.session.products;
      products2.forEach(product2 => {
        price += +product2.price;
      })
    }
    Product
      .findAll()
      .then(products1 => {
        res.render('shoppingCart', { products1, products2, price });
      })
      .catch(err => {
        res.send(err);
      })
  }

  static getLogout(req, res) {
    req.session.username = undefined;

    if (req.session.products) {
      let products2 = req.session.products;
      Product
        .findAll()
        .then(products1 => {

          products1.forEach(product1 => {
            products2.forEach(product2 => {
              if (product1.id == product2.productId) {
                Product
                  .increment({
                    quantity: product2.quantityBought
                  }, {
                    where: {
                      id: product1.id
                    }
                  })
                  .then(() => {
                    console.log('Sukses balikin ke database!');
                  })
                  .catch(err => {
                    res.send(err);
                  })
              }
            })
          })

          req.session.products = undefined;
          res.redirect('/');

        })
        .catch(err => {
          res.send(err);
        })
    } else {
      res.redirect('/');
    }

  }

  static postProduct(req, res) {
    if (req.session.username) {
      let productId = req.params.productId;
      let number = +req.body.quantity;
      let price = +req.body.price;
      console.log(req.body);
      Product
        .decrement(
          { quantity: number }
          , {
            where: {
              id: productId
            }
          }, {
          include: [Customer]
        })
        .then(() => {
          if (!req.session.products) {
            req.session.products = [];
          }

          let newProduct = {
            productId,
            quantityBought: number,
            price
          }

          req.session.products.push(newProduct);
          res.redirect('/products');
        })
        .catch(err => {
          res.send(err);
        })
    } else {
      res.redirect('/login');
    }
  }
}

module.exports = Controller;