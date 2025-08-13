import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";
import bcrypt from "bcryptjs";

class User extends Model {
  // Generate Access Token
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
