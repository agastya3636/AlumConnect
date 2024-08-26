import { Router } from "express";

import * as jobsController from "../controllers/jobs.controller.js";

const router = Router();

router.route("/").get(jobsController.getJobs);
router.route("/jobpost").post(jobsController.JobPosts);
router.route("/jobpost/:id").get(jobsController.getJobPostById);
router.route("/jobpost/:id").put(jobsController.updateJobPostById);
router.route("/jobpost/:id").delete(jobsController.deleteJobPostById);

export default router;