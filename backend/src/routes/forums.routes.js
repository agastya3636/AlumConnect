import * as forum from "../controllers/forums.controller.js";
import { Router } from "express";

const router = Router();

router.route("/").get(forum.getForums);
router.route("/:id").get(forum.getForumById);
router.route("/").post(forum.createForum);
router.route("/:id").put(forum.updateForum);
router.route("/:id").delete(forum.deleteForum);

export default router;