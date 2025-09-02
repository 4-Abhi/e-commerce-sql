import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

class Rating extends Model {
  static associate(models) {
    // Rating Belong to the user
    Rating.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    // Rating belong to one Product
    Rating.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  }
}

Rating.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ratingValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
  },
  {
    sequelize,
    tableName: "Rating",
    modelName: "Rating",
    timestamps: true,
  }
);

export default Rating;
