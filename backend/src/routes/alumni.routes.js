import { Router } from "express";
import * as alumniController from "../controllers/alumni.controller.js";
import { authenticateJWT } from '../middlewares/authenticateJWT.js';


const router = Router();

router.route("/register").post(alumniController.alumniRegister);
router.route("/login").post(alumniController.alumniLogin);
router.route("/").get(authenticateJWT, alumniController.getAlumni);
router.route("/:id").get(authenticateJWT,alumniController.alumniProfile);
router.route("/:id").put(authenticateJWT, alumniController.alumniUpdateProfile);
router.route("/:id").delete(authenticateJWT, alumniController.alumniDeleteProfile);

export default router;