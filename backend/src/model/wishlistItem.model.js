import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class WishListItem  extends Model{

}

WishListItem.init({
    
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },

} , {
    sequelize ,
    modelName:"WishListItem", 
    tableName:"WishListItem",
    timestamps: true

})

export default WishListItem