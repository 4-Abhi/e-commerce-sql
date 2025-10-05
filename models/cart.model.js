import { DataTypes, Model } from "sequelize";
import sequelize from "../backend/src/db/index.js";

class Cart extends Model {
  static associate(models) {
    Cart.belongsTo(models.User, { foreignKey: "userId" });
    Cart.belongsTo(models.Product, { foreignKey: "productId" });
  }
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  { sequelize, modelName: "Cart", tableName: "carts" }
);
