import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class UserRole extends Model {
  static associate(models) {
    UserRole.hasMany(models.User, {
      foreignKey: "roleId",
      as: "users", // optional alias
    });
  }
}

UserRole.init(
  {
    id: {   // Explicity Added the Id
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM("user", "admin", "superAdmin"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserRole",
    tableName: "UserRole",
    timestamps: true,
  }
);

export default UserRole;
