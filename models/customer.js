'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, { foreignKey: 'CustomerId' });
      Customer.belongsToMany(models.Product, { through: models.ProductCustomer });
    }
  };
  Customer.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    unique_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });

  Customer.beforeCreate((user, options) => {
    let randomNumber1 = Math.ceil(Math.random() * 10000);
    let randomNumber2 = Math.ceil(Math.random() * 10000);
    let words = ['lion', 'tiger', 'sky', 'skyfall', 'stars', 'elephant', 'bottle'];
    let randomNumber3 = words.length - 1;
    let uniqueCode = `${randomNumber1} ${words[randomNumber3]} ${randomNumber2}`;
    user.unique_code = uniqueCode.split(' ').join('_');
  });

  return Customer;
};