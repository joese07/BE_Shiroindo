"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invoices", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      atas_nama: {
        type: Sequelize.STRING,
      },
      kepada: {
        type: Sequelize.STRING,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      sub_total_harga: {
        type: Sequelize.STRING,
      },
      no_kuitansi: {
        type: Sequelize.STRING,
      },
      no_invoice: {
        type: Sequelize.STRING,
      },
      nama_pengirim_bpkb: {
        type: Sequelize.STRING,
      },
      nama_penerima_bpkb: {
        type: Sequelize.STRING,
      },
      tgl_pengiriman_bpkb: {
        type: Sequelize.DATE,
      },
      status_pengiriman_bpkb: {
        type: Sequelize.STRING,
      },
      tgl_penerima_bpkb: {
        type: Sequelize.DATE,
      },
      image_penerima_bpkb: {
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
    await queryInterface.dropTable("Invoices");
  },
};
