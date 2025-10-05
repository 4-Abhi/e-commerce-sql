import { DataTypes, Model } from "sequelize";
import sequelize from "../backend/src/db/index.js";

class Wishlist extends Model {
  static associate(models) {
    Wishlist.belongsTo(models.User, { foreignKey: "userId" });
    Wishlist.belongsTo(models.Product, { foreignKey: "productId" });
  }
}

Wishlist.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Wishlist", tableName: "wishlists" }
);
