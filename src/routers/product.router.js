import express from 'express'
import ProductController from '../controller/Product/product.controller.js';
import multer from 'multer'
import checkAccessToken from '../middleware/checkAccessToken.js';
const router = express.Router();

const storeage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storeage})
const uploadImage = multer({ storage: storeage})

const product = new ProductController();

router.post('/create',checkAccessToken, product.CreatePro)
router.get('/get', product.GetProductbyPage)
router.get('/detail', product.GetProductById)
router.get('/productAdmin',checkAccessToken,product.getProductByUserId)
router.put('/update', product.Update)
router.delete('/deletesoft', product.DeleteSoft)
router.delete('/delete', product.Delete)

//upload image
router.post('/upload', upload.array("files"), product.UploadImages)
// products cart

//import export
router.post('/import-product', upload.single("import"), product.ImportProduct )
router.get('/export-excel', product.ExportProduct)
router.get('/search', product.findProductByName)

export default router;

