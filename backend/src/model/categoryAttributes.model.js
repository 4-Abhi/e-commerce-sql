import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class CategoryAttribute extends Model {}

CategoryAttribute.init(
  {
    categoryId: DataTypes.INTEGER,
    attributeId: DataTypes.INTEGER,
  },
  { sequelize, modelName: "CategoryAttribute" }
);

export default CategoryAttribute;
