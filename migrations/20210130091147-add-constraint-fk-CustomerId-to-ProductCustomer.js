'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint("ProductCustomers", {
      fields: ['CustomerId'],
      type: "foreign key",
      name: "custom_fkey_constraint_CustomerId",
      references: {
        table: "Customers",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint("ProductCustomers", "custom_fkey_constraint_CustomerId", {});
  }
};
