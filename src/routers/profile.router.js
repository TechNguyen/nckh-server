import express from "express"
import ProfileController from "../controller/Profile/Profile.controller.js";

const router = express.Router();
const profile = new ProfileController();

router.get('/getProfileClient', profile.GetPofileAuthInClient)
router.put('/updateProfile', profile.updateProfile)
// router.post('/createProfile', profile.createProfile)

export default router