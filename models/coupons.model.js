import { DataTypes, Model } from "sequelize";
import sequelize from "../backend/src/db/index.js";

class Coupon extends Model {
  static associate(models) {
    Coupon.belongsToMany(models.User, {
      through: "UserCoupons", // to track who used coupon
      foreignKey: "couponId",
    });
  }
}

Coupon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM("percentage", "flat"),
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    minAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Coupon", tableName: "coupons" }
);
