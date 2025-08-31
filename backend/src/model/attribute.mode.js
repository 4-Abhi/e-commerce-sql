import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

// The Attribute model is only meant to define the types of filters/properties, not the actual values.

class Attribute extends Model {
  static associate(models) {
    // One attribute can belong to many categories
    // It means “this table has a foreign key pointing to another table.”

    // This creates a many-to-many link between Attribute and Category using a join table called CategoryAttributes.
    Attribute.belongsToMany(models.Category, {
      through: "CategoryAttributes",
      foreignKey: "attributeId",
    });

    // One attribute can be used in many product-attributes
    Attribute.hasMany(models.ProductAttribute, { foreignKey: "attributeId" });
  }
}

Attribute.init(
  {
    name: { type: DataTypes.STRING, allowNull: false }, // e.g. "color", "size"
    type: { type: DataTypes.STRING, allowNull: false }, // e.g. "string", "number", "boolean"
  },
  { sequelize, modelName: "Attribute" }
);

export default Attribute;
