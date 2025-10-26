import {  Model , DataTypes } from "sequelize";
import sequelize from "../db/index.js";

class ProductVariant extends Model {
  static associate(models) {
    ProductVariant.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  }
}

ProductVariant.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER, // Quantity available
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "ProductVariant",
    modelName: "ProductVariant",
  }
);

export default ProductVariant;
