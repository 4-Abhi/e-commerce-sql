import {Router} from "express";
import {  createCategory , getAllCategories , getCategoryById , updateCategory , deleteCategory}  from "../controller/category.controller.js"


 
const router = Router();


router.route("/create-category").post(createCategory);
router.route("/getAll-category").get(getAllCategories);
router.route("/get-category/:id").get(getCategoryById);
router.route("/update-category/:id").put(updateCategory);
router.route("/delete-category/:id").delete(deleteCategory);

export default router;