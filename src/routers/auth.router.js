import express from "express"
import authController from "../controller/auth.controller.js";
import appMiddleware from "../middleware/app.middleware.js";
const router = express.Router();
const auth = new authController();

router.post('/sign-up', auth.signUp)

export default router