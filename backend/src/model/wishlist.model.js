import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class WishList extends Model {
  static associate(models) {
    WishList.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
     

     // Many-to-Many: WishList ↔ Product through WishListItem
    WishList.belongsToMany(models.Product, {
      through: models.WishListItem, // join table
      foreignKey: "wishlistId",     // column in WishListItem
      otherKey: "productId",        // column in WishListItem
      as: "products",
    });
  }
}
WishList.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "WishList",
    modelName: "WishList",
    timestamps: true,
  }
);
export default WishList;
