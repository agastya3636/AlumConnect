import { Router } from "express";
import * as alumniController from "../controllers/alumni.controller.js";

const router = Router();

// router.get("/", alumniController.getAlumni);
// router.post("/", alumniController.createAlumni);
// router.get("/:id", alumniController.getAlumniById);
// router.put("/:id", alumniController.updateAlumni);
// router.delete("/:id", alumniController.deleteAlumni);



router.route("/register").post(alumniController.alumniRegister);
router.route("/login").post(alumniController.alumniLogin);

export default router;