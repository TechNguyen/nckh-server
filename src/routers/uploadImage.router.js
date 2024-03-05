import express from "express"
import uploadImageController from '../controller/Images/image.controller.js'
const router = express.Router();
import upload from '../middleware/upload.middleware.js'
const uploadImg = new uploadImageController();

router.post('/upload', upload.fields([{name:'img',maxCount:1}]), uploadImg.uploadImage)

export default router