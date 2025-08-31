import Category from "../model/category.model.js";
import Product from "../model/product.model.js";
import ProductAttribute from "../model/productAttribute.model.js"
import Attribute from "../model/productAttribute.model.js";
import CategoryAttribute from "../model/categoryAttributes.model.js"

// Collect all models
const models = {
  Category,
  Product,
  ProductAttribute,
  Attribute,
  CategoryAttribute
};

// Run associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// if you need to export your sequelize instance
export default models;
