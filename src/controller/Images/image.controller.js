import ProductModel from '../../model/Product.model.js';
import imagesProduct from '../../model/imagesproduct.model.js'
class uploadImageController {
    async uploadImage(req,res,next){
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
            product.images.push(im._id);
            await product.save()
            res.status(200).json({
                msg:"success",
                img:im
            })
        }catch(err){
            res.status(500).json({
                msg:"upload unscess",
            })
        }
    }
}
export default uploadImageController