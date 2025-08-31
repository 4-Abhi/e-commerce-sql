import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class User extends Model {
  // For Address Mapping
  static associate(models) {
    // Address Model
    User.hasMany(models.Address, {
      foreignKey: "userId",
      as: "addresses", // optional alias (useful when querying)
    });

    User.belongsTo(models.UserRole, {
      foreignKey: "roleId",
    });
  }

  // Generate Access Token
  // instance method
  generateAccessToken() {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECERET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  }

  // Generate Refresh Token
  generateRefreshToken() {
    return jwt.sign(
      {
        id: this.id,
      },
      process.env.REFRESH_TOKEN_SECERET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  }

  // Password check
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // Remove extra spaces and convert to lowercase
        this.setDataValue("username", value.trim().toLowerCase());
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false, // Required field
      validate: {
        isEmail: true, // Extra validation
      },
      set(value) {
        this.setDataValue("email", value.trim().toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
      set(value) {
        this.setDataValue("fullName", value?.trim().toLowerCase());
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
    coverImage: {
      type: DataTypes.STRING,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Roles", // table name (make sure it matches your Role model tableName)
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT", // or "CASCADE" if you want users deleted when a role is deleted
    },
  },

  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

// ✅ Add hooks for hashing password
User.addHook("beforeCreate", async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

User.addHook("beforeUpdate", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

export default User;
