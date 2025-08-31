import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class Wishlist extends Model {
  static associate(models) {
    Wishlist.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
//    This is also correct
    // Wishlist.hasMany(models.WishlistItem, {
    //   foreignKey: "wishListId",
    // });

    Wishlist.belongsToMany(models.Product, {
      through: models.WishlistItem,
      foreignKey: "wishlistId",
      as: "products",
    });
  }
}
Wishlist.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Wishlist",
    modelName: "Wishlist",
    timestamps: true,
  }
);
export default Wishlist;
