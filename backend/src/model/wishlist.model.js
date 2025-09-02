import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class WishList extends Model {
  static associate(models) {
    WishList.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    //   This is also correct
    // WishList.hasMany(models.WishListItem, {
    //   foreignKey: "wishListId",
    //   as: "wishListItem"
    // });

    WishList.belongsToMany(models.Product, {
      through: models.WishListItem,
      foreignKey: "wishlistId",
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
