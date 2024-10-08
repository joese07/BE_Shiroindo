"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Invoice);
    }
  }
  Payment.init(
    {
      InvoiceId: DataTypes.STRING,
      payment: DataTypes.STRING,
      full_payment_method: DataTypes.STRING,
      full_payment_date: DataTypes.DATE,
      full_payment_image: DataTypes.STRING,
      half_payment_method: DataTypes.STRING,
      half_payment_date: DataTypes.DATE,
      half_payment_image: DataTypes.STRING,
      total_payment: DataTypes.STRING,
      total_tagihan: DataTypes.STRING,
      sisa_tagihan: DataTypes.STRING,
      lebih_bayar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
