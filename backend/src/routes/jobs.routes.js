import { Router } from "express";

import * as jobsController from "../controllers/jobs.controller.js";

const router = Router();

router.route("/").get(jobsController.getJobs);
router.route("/jobpost").post(jobsController.JobPosts);
// router.route("/jobpost/:id").get(jobsController.getJobPostById);

export default router;