import  Product  from "../model/product.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, categoryId } = req.body;

    // Ensure category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw  new ApiError(404 , "Category not Found")
    }

    const product = await Product.create({
      name,
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
  
    const products = await Product.findAll({
      include: {
        model: Category,
        as: "category",
        attributes: ["id", "name", "parentId"],
      },
    });

    return res.status(200).json(new ApiResponse(200, {data:products}, "Product Fetch Successfully"));
  })


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
      throw ApiError(404, "Product Not Found")
    }

 return res.status(200).json(new ApiResponse(200, {data:product}, "Product Fetch Successfully"));
  
})


// Update a product
export const updateProduct = asyncHandler( async (req, res) => {
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
    return res.status(200).json(new ApiResponse(200 , {data:product}, "Product Fetched Successfully"));
   
})


// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting product", error });
  }
};
