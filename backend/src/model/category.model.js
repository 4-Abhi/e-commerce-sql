import { Model, DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import slugify from "slugify";

class Category extends Model {
  // The associate method is used to define relationships after all models are initialized.
  static associate(models) {
    // A category can have many subcategories
    Category.hasMany(models.Category, {
      as: "subcategories",
      foreignKey: "parentId",
    });

    Category.belongsTo(models.Category, {
      as: "parent",
      foreignKey: "parentId",
    });

    // A category can have many Product
    Category.hasMany(models.Product, {
      as: "product",
      foreignKey: "categoryId",
    });

    // category.model.js
    // Category.belongsToMany(models.Attribute, {
    //   through: "CategoryAttributes",
    //   foreignKey: "categoryId",
    // });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // 1: main, 2: subcategory, 3: product category
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true, // this column can be null
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "Categories",
    timestamps: true,
    hooks: {
      beforeValidate: (category) => {
        if (category.name) {
          category.slug = slugify(category.name, { lower: true });
        }
      },
    },
  }
);

export default Category;
