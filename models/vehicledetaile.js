"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VehicleDetaile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VehicleDetaile.belongsTo(models.Invoice);
    }
  }
  VehicleDetaile.init(
    {
      InvoiceId: DataTypes.STRING,
      no_rangka: DataTypes.STRING,
      no_mesin: DataTypes.STRING,
      thn_kendaraan: DataTypes.STRING,
      no_bpkb: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VehicleDetaile",
    }
  );
  return VehicleDetaile;
};
