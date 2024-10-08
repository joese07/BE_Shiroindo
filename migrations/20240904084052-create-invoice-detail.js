"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("InvoiceDetails", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      InvoiceId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      item: {
        type: Sequelize.STRING,
      },
      kuantitas: {
        type: Sequelize.STRING,
      },
      harga_satuan: {
        type: Sequelize.STRING,
      },
      total_harga: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("InvoiceDetails");
  },
};
