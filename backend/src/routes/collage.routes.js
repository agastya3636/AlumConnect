import { Router } from "express";

import * as collageController from "../controllers/collage.contoller.js";

const router = Router();

router.route("/register").post(collageController.collageRegister);
router.route("/login").post(collageController.collageLogin);
router.route("/" ).get(collageController.getCollage);
router.route("/:id").get(collageController.getCollageById);
router.route("/:id").put(collageController.collageProfileUpdate);
router.route("/:id").delete(collageController.deleteCollage);

export default router;