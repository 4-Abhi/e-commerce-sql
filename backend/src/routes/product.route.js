import { Router } from "express";
import {createProduct , getAllProducts , getProductById , updateProduct , deleteProduct} from "../controller/product.controller.js"


const router = Router();

router.route("/create-product").post(createProduct);
router.route("/getAll-product").get( getAllProducts);
router.route("/getProduct/:id").get( getProductById);
router.route("/update-product/:id").put(updateProduct);
router.route("/delete-product/:id").delete(deleteProduct);

export default router;