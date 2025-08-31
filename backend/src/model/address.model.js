import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class Address extends Model {
  static associate(models) {
    Address.belongsTo(models.User, {
      foreignKey: "userId",
    });
  }
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    addressOne: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "Address",
    timestamps: true,
  }
);

export default Address;
