import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

const storage  = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder:'FOOD',
    allowedFormats:['jpg','png','jpeg','webp'],
    transformation:[{width:500,height:500,crop:'limit'}]
})

const upload = multer({
    storage: storage
})
export default upload;