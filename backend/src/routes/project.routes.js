import { getProjects, getProjectById, createProject } from '../controllers/project.controller.js';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';
import { Router } from "express";

const router = Router();

router.route("/").get(authenticateJWT,getProjects);
router.route("/:id").get(authenticateJWT,getProjectById);
router.route("/").post(authenticateJWT,createProject);

export default router;
