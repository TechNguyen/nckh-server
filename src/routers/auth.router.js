import express from "express"
import authController from "../controller/Auth/auth.controller.js";
const router = express.Router();
const auth = new authController();
import checkAccessToken from "../middleware/checkAccessToken.js";

router.post('/sign-up', auth.signUp)
router.post('/sign-in', auth.signIn)
router.get('/token', auth.token)
router.get('/me',checkAccessToken, auth.getMe)
router.post('/reset-password', auth.ResetPassWord)
router.post('/sendEmail', auth.SendEmailConfirmResetPassword)
export default router