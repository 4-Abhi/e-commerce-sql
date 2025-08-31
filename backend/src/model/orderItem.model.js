import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class OrderItem extends Model {
    static associate(models){
        OrderItem.belongsTo(models.Order ,{
            foreignKey:"orderId",
            as: "order"
        })
        OrderItem.belongsTo(models.Product , {
            foreignKey:"productId",
            as: "product"
        })
    }

}

OrderItem.init({
    orderId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
     quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }

} , {
    sequelize , 
    tableName:"OrderItems",
    modelName:"OrderItems",
    timestamps: true
})