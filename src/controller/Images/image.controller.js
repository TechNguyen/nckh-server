import { ObjectId } from 'mongodb';
import ProductModel from '../../model/Product.model.js';
import imagesProduct from '../../model/imagesproduct.model.js'
class uploadImageController {
    async uploadImage(req,res,next){
        console.log('req',req.body)
        console.log('req222',req.files)
        const link_img = req.files['img'][0];
        const {name,productId} = req.query;
        if(!name || !productId){
            return res.status(500).json({
                msg:"plesea enter name or proid"
            })
        }
        const imgUrl =  link_img.path;
        const extension = link_img.mimetype.split('/')[1]
        const data = {name,imgUrl,extension,productId}
        try {
            const imgMo = new imagesProduct(data);
            const im =  await imagesProduct.create(imgMo);
            const product = await ProductModel.findById(productId);
            console.log("checl pr",product)
            if(!product){
                return res.status(401).json({
                    msg:"no product"
                })
            }
            const ImageExit = await imagesProduct
            product.images[0] = im._id;
            await product.save()
            res.status(200).json({
                msg:"success",
                img:im
            })
        }catch(error){
            res.status(500).json({
                msg:"upload unscess",
                err: error.message
            })
        }
    }
}
export default uploadImageController