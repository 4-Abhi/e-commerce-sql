import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class ProductImage extends Model {
   static associate(models){
    ProductImage.belongsTo(models.Product ,{
      foreignKey:"productId",
      as:"product"
    } )
   }
}

ProductImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
     productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProductImage",
    tableName: "ProductImages",
  }
);

export default ProductImage;
