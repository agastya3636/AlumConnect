import { Router } from "express";

import * as eventsController from "../controllers/events.controller.js";

const router = Router();

router.route("/").get(eventsController.getEvents);
router.route("/eventpost").post(eventsController.EventPosts);
router.route("/eventpost/:id").get(eventsController.getEventPostById);
router.route("/eventpost/:id").put(eventsController.updateEventPostById);
router.route("/eventpost/:id").delete(eventsController.deleteEventPostById);

export default router;