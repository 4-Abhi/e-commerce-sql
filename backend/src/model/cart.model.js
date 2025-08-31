import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class Cart extends Model {
  static associate(models) {
    Cart.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Cart.hasMany(models.CartItem, {
      foreignKey: "cartId",
    });
  }
}

Cart.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cart",
    tableName: "Cart",
    timestamps: true,
  }
);

export default Cart;
