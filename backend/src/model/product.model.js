import { Model, DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import slugify from "slugify";

class Product extends Model {
  static associate(models) {
    // ✅ A product belongs to a category
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });

    // One product can have many attributes
    Product.hasMany(models.ProductAttribute, { foreignKey: "productId" });

    // Cart Item
    Product.hasMany(models.CartItem, {
      foreignKey: "productId",
      as: "cartItems",
    });

    //  Rating - One Product have many Rating
    Product.hasMany(models.Rating, {
      foreignKey: "productId",
      as: "ratings",
    });

    // ✅ Wishlist relation (many-to-many)

    Product.belongsToMany(models.WishList, {
      through: models.WishListItem,
      foreignKey: "productId",
      otherKey: "wishlistId",
      as: "wishlists",
    });

    // ✅ A product can have many images
    Product.hasMany(models.ProductImage, {
      foreignKey: "productId",
      as: "images",
      onDelete: "CASCADE",
    });

    // Product has many size variants
    Product.hasMany(models.ProductVariant, {
      foreignKey: "productId",
      as: "sizes",
    });

    // Self reference for color variants
    Product.hasMany(models.Product, {
      foreignKey: "parentId",
      as: "variants",
      onDelete: "CASCADE",
    });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discountPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true, // like "Olive Green"
    },

    description: {
      type: DataTypes.TEXT,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true, // used for color variants
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "Products",
    timestamps: true,
    hooks: {
      beforeValidate: (product) => {
        if (product.title) {
          product.slug = slugify(product.title, { lower: true });
        }
      },
    },
  }
);

export default Product;
