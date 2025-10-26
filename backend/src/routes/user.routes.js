import { Router } from "express";
import {
  getAllUser,
  loginController,
  registerController,
} from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/login").post(loginController);
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
  ]),
  registerController
);

router.route("/getAlluser").get(getAllUser)

export default router;
