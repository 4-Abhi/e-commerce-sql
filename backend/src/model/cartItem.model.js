import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class CartItem extends Model {
    static accociate(models){
        CartItem.belongsTo(models.Cart,{
            foreignKey:"cartId"
        })
        CartItem.belongsTo(models.Product , {
            foreignKey:"productId",
            as:"product"
        })
    }
}

CartItem.init(
  {
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // One product can appear in many items // CartItem always points to one Product only
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

  },
  {
    sequelize,
    modelName: "CartItem",
    tableName: "CartItem",
    timestamps: true,
  }
);
export default CartItem;
