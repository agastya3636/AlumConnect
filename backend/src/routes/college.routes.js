import { Router } from "express";

import * as collegeController from "../controllers/college.contoller.js";

const router = Router();

router.route("/register").post(collegeController.collegeRegister);
router.route("/login").post(collegeController.collegeLogin);
router.route("/").get(collegeController.getCollege);
router.route("/:id").get(collegeController.getCollegeById);
router.route("/:id").put(collegeController.collegeProfileUpdate);
router.route("/:id").delete(collegeController.deleteCollege);

export default router;