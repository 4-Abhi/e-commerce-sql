import { Router } from "express";
import { loginController, signUpController} from "../controller/user.controller.js";
 
const router = Router();

router.route("/login" ).post(loginController)
router.route("/register").post(signUpController)
 

 

export default router;