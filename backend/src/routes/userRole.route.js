import { Router } from "express";
import { createUserRole, getAllUserRole } from "../controller/userRole.controller.js";

const router = Router();

router.route("/create-userrole").post(createUserRole)
router.route("/getAllRole").get(getAllUserRole)

export default router;