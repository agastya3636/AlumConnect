import { Router } from "express";

import * as studentController from "../controllers/student.controller.js";
import { authenticateJWT } from '../middlewares/authenticateJWT.js';

const router = Router();

router.route("/register").post(studentController.studentRegister);
router.route("/login").post(studentController.studentLogin);
router.route("/:id").get(studentController.studentProfile);
router.route("/:id").put(studentController.studentUpdateProfile);


export default router;