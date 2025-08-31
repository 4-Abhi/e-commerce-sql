import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class Order extends Model{
   static associate(models){
    Order.belongsTo(models.User, {
        foreignKey: "userId"
    })

    Order.hasMany(models.OrderItem , {
        foreignKey:"orderId"
    })
   }

}

Order.init({
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
      defaultValue: "pending",
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    

}, {
    sequelize,
    tableName:"Order",
    modelName:"Order",
    timestamps: true
})

export default Order