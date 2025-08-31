import { Model, DataTypes } from "sequelize";
import sequelize from "../db/index.js";

class Product extends Model {
  static associate(models) {

    Product.belongsTo(models.Category, { foreignKey: "categoryId" });

    // One product can have many attributes
    Product.hasMany(models.ProductAttribute, { foreignKey: "productId" });


     Product.hasMany(models.CartItem , {
      foreignKey:"productId",
      as: "cartItems"
     })
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slug: { 
      type: DataTypes.STRING, 
      unique: true
     },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "Products",
    timestamps: true,
  }
);

export default Product;
