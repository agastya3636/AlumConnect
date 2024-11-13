import * as forum from "../controllers/forums.controller.js";
import { Router } from "express";
import {authenticateJWT} from "../middlewares/authenticateJWT.js";

const router = Router();

router.route("/").get(authenticateJWT,forum.getForums);
router.route("/:id").get(authenticateJWT,forum.getForumById);
router.route("/").post(authenticateJWT,forum.createForum);
router.route("/:id").put(authenticateJWT,forum.updateForum);
router.route("/:id").delete(authenticateJWT,forum.deleteForum);

export default router;