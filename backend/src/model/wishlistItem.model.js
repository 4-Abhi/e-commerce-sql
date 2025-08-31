import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class WishlistItem  extends Model{
    static associate(models){
        WishlistItem.belongsTo(models.Wishlist , {
            foreignKey:"wishlistId",
            as: "wishlist"
        })
       
        WishlistItem.belongsTo(models.Product , {
            foreignKey:"productId",
            as:"product"
        })

    }

}

WishlistItem.init({
    wishListId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

} , {
    sequelize ,
    modelName:"WishListItem", 
    tableName:"WishListItem",
    timestamps: true

})