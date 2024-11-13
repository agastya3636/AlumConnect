import { Router } from "express";
import{authenticateJWT} from "../middlewares/authenticateJWT.js";
import * as eventsController from "../controllers/events.controller.js";

const router = Router();

router.route("/").get(authenticateJWT,eventsController.getEvents);
router.route("/eventpost").post(authenticateJWT,eventsController.EventPosts);
router.route("/eventpost/:id").get(authenticateJWT,eventsController.getEventPostById);
router.route("/eventpost/:id").put(authenticateJWT,eventsController.updateEventPostById);
router.route("/eventpost/:id").delete(authenticateJWT,eventsController.deleteEventPostById);

export default router;