'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Order, { through: models.OrderDetail });
    }
  };
  Product.init({
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    type: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};