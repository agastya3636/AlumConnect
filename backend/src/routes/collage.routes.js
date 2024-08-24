import { Router } from "express";

import * as collageController from "../controllers/collage.contoller.js";

const router = Router();

router.route("/register").post(collageController.collageRegister);
router.route("/login").post(collageController.collageLogin);
router.route("/profile").put(collageController.collageProfileUpdate);

export default router;