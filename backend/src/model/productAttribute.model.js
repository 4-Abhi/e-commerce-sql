import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class ProductAttribute extends Model {
  static associate(models) {
    ProductAttribute.belongsTo(models.Product, { foreignKey: "productId" });
    ProductAttribute.belongsTo(models.Attribute, { foreignKey: "attributeId" });
  }
}

ProductAttribute.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attributeId: {   // 👈 instead of attribute string
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    value: DataTypes.STRING,
  },
  { sequelize, modelName: "ProductAttribute", tableName: "ProductAttributes" }
);

export default ProductAttribute;
