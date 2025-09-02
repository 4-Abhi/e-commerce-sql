import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class WishListItem  extends Model{
    static associate(models){
        WishListItem.belongsTo(models.WishList , {
            foreignKey:"wishListId",
            as:"wishList"
        })
       
        WishListItem.belongsTo(models.Product , {
            foreignKey:"productId",
            as:"product"
        })

    }

}

WishListItem.init({
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

export default WishListItem