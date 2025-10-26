import { Router } from "express";
import {createProduct , getAllProducts , getProductById , } from "../controller/product.controller.js"


const router = Router();

router.route("/create-product").post(createProduct);
router.route("/getProduct/:slug").get(getAllProducts);
router.route("/getProduct/:id").get( getProductById);
 

export default router;