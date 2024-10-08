"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Invoice);
    }

    static async register({ email, password }) {
      if (!email || !password) {
        return Promise.reject({
          message: "Failed to create new user",
          code: "auth/register-invalid",
        });
      }

      try {
        const cekExist = await this.findAll({
          where: {
            email,
          },
        });

        const encryptedPassword = await bcrypt.hash(password, 10);
        const uuid = require("uuid");
        let randomId = uuid.v4();

        let cekId = await this.findByPk(randomId);

        for (let i = 0; i < cekId; i++) {
          randomId;
        }

        const user = await this.create({
          id: randomId,
          email,
          password: encryptedPassword,
        });
        return Promise.resolve(user);
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          return Promise.reject({
            message: "User already exists",
            code: "auth/user-exists",
          });
        }
        return Promise.reject(error);
      }
    }

    generateToken() {
      const payload = {
        id: this.id,
      };

      const rahasia = "Ini rahasia ga boleh disebar-sebar";
      const token = jwt.sign(payload, rahasia);
      return token;
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
