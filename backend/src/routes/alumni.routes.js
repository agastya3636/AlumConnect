import { Router } from "express";
import * as alumniController from "../controllers/alumni.controller.js";

const router = Router();

// router.get("/", alumniController.getAlumni);
// router.post("/", alumniController.createAlumni);
// router.get("/:id", alumniController.getAlumniById);
// router.put("/:id", alumniController.updateAlumni);
// router.delete("/:id", alumniController.deleteAlumni);


router.route("/login").post(
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Login endpoint hit",
        });
    }
)
router.route("/jobpost").post(
    alumniController.JobPosts
)

export default router;