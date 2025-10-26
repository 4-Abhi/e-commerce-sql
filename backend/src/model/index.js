import Address from "../model/address.model.js";
import Category from "../model/category.model.js";
import CategoryAttribute from "../model/categoryAttributes.model.js";
import Product from "../model/product.model.js";
import ProductAttribute from "../model/productAttribute.model.js";
import Attribute from "../model/attribute.mode.js";
import Order from "../model/order.model.js";
import OrderItem from "../model/orderItem.model.js";
import Cart from "../model/cart.model.js";
import CartItem from "../model/cartItem.model.js";

import User from "../model/user.model.js"
import UserRole from "../model/userRole.model.js"
import Rating from "../model/rating.model.js"
import WishList from '../model/wishlist.model.js'
import WishListItem from "../model/wishlistItem.model.js";
import ProductImage  from "../model/productImage.model.js"
import ProductVariant from "../model/productVariant.model.js"
 



// Collect all models
const models = {
  User,
  Address,
  UserRole,
  Category,
  Product,
  ProductAttribute,
  Attribute,
  CategoryAttribute,
  Order,
  OrderItem,
  Cart,
  CartItem,
  Rating,
  WishList,
  WishListItem,
  ProductImage,
  ProductVariant,

};

// Run associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// if you need to export your sequelize instance
export default models;
