import { Router } from "express";
import {authenticateJWT} from "../middlewares/authenticateJWT.js";
import * as jobsController from "../controllers/jobs.controller.js";

const router = Router();

router.route("/").get(authenticateJWT,jobsController.getJobs);
router.route("/jobpost").post(authenticateJWT,jobsController.JobPosts);
router.route("/jobpost/:id").get(authenticateJWT,jobsController.getJobPostById);
router.route("/jobpost/:id").put(authenticateJWT,jobsController.updateJobPostById);
router.route("/jobpost/:id").delete(authenticateJWT,jobsController.deleteJobPostById);

export default router;