"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InvoiceDetail.belongsTo(models.Invoice);
    }
  }
  InvoiceDetail.init(
    {
      InvoiceId: DataTypes.STRING,
      item: DataTypes.STRING,
      kuantitas: DataTypes.STRING,
      harga_satuan: DataTypes.STRING,
      total_harga: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "InvoiceDetail",
    }
  );
  return InvoiceDetail;
};
