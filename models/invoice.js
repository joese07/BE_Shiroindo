"use strict";
const { Model, STRING, DATE } = require("sequelize");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoice.belongsTo(models.User);
      Invoice.hasMany(models.InvoiceDetail);
      Invoice.hasMany(models.VehicleDetaile);
      Invoice.hasMany(models.Payment);
    }
  }
  Invoice.init(
    {
      UserId: DataTypes.STRING,
      atas_nama: DataTypes.STRING,
      kepada: DataTypes.STRING,
      keterangan: DataTypes.STRING,
      sub_total_harga: DataTypes.STRING,
      no_kuitansi: DataTypes.STRING,
      no_invoice: DataTypes.STRING,
      nama_pengirim_bpkb: DataTypes.STRING,
      nama_penerima_bpkb: DataTypes.STRING,
      tgl_pengiriman_bpkb: DataTypes.DATE,
      status_pengiriman_bpkb: DataTypes.STRING,
      tgl_penerima_bpkb: DataTypes.DATE,
      image_penerima_bpkb: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
