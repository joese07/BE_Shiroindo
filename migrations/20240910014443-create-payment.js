"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      InvoiceId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      payment: {
        type: Sequelize.STRING,
      },
      full_payment_method: {
        type: Sequelize.STRING,
      },
      full_payment_date: {
        type: Sequelize.DATE,
      },
      full_payment_image: {
        type: Sequelize.STRING,
      },
      half_payment_method: {
        type: Sequelize.STRING,
      },
      half_payment_date: {
        type: Sequelize.DATE,
      },
      half_payment_image: {
        type: Sequelize.STRING,
      },
      total_payment: {
        type: Sequelize.STRING,
      },
      total_tagihan: {
        type: Sequelize.STRING,
      },
      sisa_tagihan: {
        type: Sequelize.STRING,
      },
      lebih_bayar: {
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
    await queryInterface.dropTable("Payments");
  },
};
