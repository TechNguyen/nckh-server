import express from "express"
import authController from "../controller/Auth/auth.controller.js";
const router = express.Router();
const auth = new authController();

router.post('/sign-up', auth.signUp)
router.post('/sign-in', auth.signIn)
router.get('/token', auth.token)
router.post('/reset-password', auth.ResetPassWord)
export default router