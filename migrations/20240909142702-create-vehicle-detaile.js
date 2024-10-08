"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VehicleDetailes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      InvoiceId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      no_rangka: {
        type: Sequelize.STRING,
      },
      no_mesin: {
        type: Sequelize.STRING,
      },
      thn_kendaraan: {
        type: Sequelize.STRING,
      },
      no_bpkb: {
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
    await queryInterface.dropTable("VehicleDetailes");
  },
};
