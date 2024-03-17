import express from "express"
import ProfileController from "../controller/Profile/Profile.controller.js";

const router = express.Router();
const profile = new ProfileController();
import checkAccessToken from "../middleware/checkAccessToken.js";

router.get('/getProfileClient',checkAccessToken, profile.GetPofileAuthInClient)
router.put('/updateProfile',checkAccessToken, profile.updateProfile)
// router.post('/createProfile', profile.createProfile)

export default router