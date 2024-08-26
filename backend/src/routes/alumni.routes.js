import { Router } from "express";
import * as alumniController from "../controllers/alumni.controller.js";

const router = Router();

router.route("/register").post(alumniController.alumniRegister);
router.route("/login").post(alumniController.alumniLogin);
router.route("/", alumniController.getAlumni);
router.route("/:id").get(alumniController.getAlumniById);
router.route("/:id").put(alumniController.updateAlumni);
router.route("/:id").delete(alumniController.deleteAlumni);

export default router;