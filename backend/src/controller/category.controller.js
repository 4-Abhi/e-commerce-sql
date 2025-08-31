import models from "../model/index.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const { Category } = models;

// Create a new category
export const createCategory = asyncHandler(async (req, res) => {
  const { name, parentId } = req.body;
  const category = await Category.create({ name, parentId });
  return res.status(201).json(
    new ApiResponse(
      200,
      {
        data: category,
      },
      "Category created successfully."
    )
  );
});

// Get all categories with nested subcategories
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll({
    where: { parentId: null }, // fetch only top-level categories
    include: [
      {
        model: Category,
        as: "subcategories",
        include: [
          {
            model: Category,
            as: "subcategories",
            include: [
              {
                model: Category,
                as: "subcategories", // go deeper if needed
              },
            ],
          },
        ],
      },
    ],
  });

return res.status(200).json(new ApiResponse(200 , {categories} , "Categries fetched successfully"))

});

// Get single category by ID (with subcategories)
export const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: {
        model: Category,
        as: "subcategories",
      },
    });

    if (!category) {
      throw new ApiError(403 , "Category not found")
    
    }

    return res.status(200).json(new ApiResponse(404 , {data: category },{ message: "Category  found" } ));
 
})


// Update a category
export const updateCategory = asyncHandler(async (req, res) => {
 
    const { id } = req.params;
    const { name, parentId } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      throw new ApiError(404 , "Category Not found")
      // return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    category.parentId = parentId !== undefined ? parentId : category.parentId;

    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      category,
    });
 
});

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting category", error });
  }
};
