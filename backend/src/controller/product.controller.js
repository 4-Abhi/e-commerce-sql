import Category from "../model/category.model.js";
import Product from "../model/product.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, categoryId } = req.body;
  console.log("HHHH", req.body);

  // Ensure category exists
  const category = await Category.findByPk(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not Found");
  }

  const product = await Product.create({
    title,
    price,
    description,
    categoryId,
  });

  return res.status(201).json({
    message: "Product created successfully",
    product,
  });
});

// Get all products (with category details)
export const getAllProducts = asyncHandler(async (req, res) => {
  const { slug } = req.params;
 
  if (!slug) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Category slug is required"));
  }

  const category = await Category.findOne({
    where: {
      slug,
    },
    attributes: ["id", "name", "slug"],
  });
  if (!category) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Category not found"));
  }
  console.log("Category is", category);
  // const {parentId} = category.dataValues
  const product = await Product.findAll({
    where: {
      categoryId: category.dataValues.id,
    },
    order: [["createdAt", "DESC"]],
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: product }, "Product Fetch Successfully")
    );
});

// Get single product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id, {
    include: {
      model: Category,
      as: "category",
      attributes: ["id", "name"],
    },
  });

  if (!product) {
    throw ApiError(404, "Product Not Found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: product }, "Product Fetch Successfully")
    );
});

// Update a product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, categoryId } = req.body;

  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // If categoryId is passed, validate it
  if (categoryId) {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    product.categoryId = categoryId;
  }

  product.name = name || product.name;
  product.price = price !== undefined ? price : product.price;
  product.description = description || product.description;
  await product.save();
  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: product }, "Product Fetched Successfully")
    );
});
 