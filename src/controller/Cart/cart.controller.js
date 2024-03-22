import CartModel from '../../model/Carts.model.js'

class CartController{
    async createProductToCart(req,res,next){
        try{
            let userId = req.user_id;
            const {productId,quantity} = req.body;
            console.log('d',req.body)
            let cartOld =await CartModel.findOne({productId:productId,userId:userId}).exec();
            if(cartOld){
                cartOld.quantity = Number(quantity) + cartOld.quantity;
                await cartOld.save();
                res.status(200).json(cartOld)
                
            }else{
                let cartMo = new CartModel({userId,productId,quantity});
                const rs = await CartModel.create(cartMo);
                return res.status(200).json({
                    msg:"success",
                    data:rs
                });
            }
             
          
        }catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    }
    async getCartByIdUser(req,res,next){
        try{
            let id = req.user_id;
            console.log('check',id)
            const rs = await CartModel.find({userId:id}).populate({
                path: 'productId',
                populate: {
                    path: 'images',
                    model: 'imagesProduct'
                }
            }).exec();
            console.log("ha",rs)
           if(rs){
              res.status(200).json(rs)
           }else{
                res.status(203).json({
                    msg: "No cart for user"
                })
           }
        }catch(error){
            return res.status(500).json({
                status:500,
                message: error.message
            })
        }
    }
    async getCarCounttByIdUser(req,res,next){
        try{
            let id = req.user_id;
            console.log('check',id)
            const rs = await CartModel.find({userId:id}).count().exec();
            console.log("ha",rs)
           if(rs){
              res.status(200).json(rs)
           }else{
                res.status(203).json({
                    msg: "No cart for user"
                })
           }
        }catch(error){
            return res.status(500).json({
                status:500,
                message: error.message
            })
        }
    }
    async DeleteProInCart(req,res,next){
        try{
            let id = req.query.id;
            console.log('check',id)
            const rs = await CartModel.findByIdAndRemove(id);
            const check = await CartModel.findById(id).exec();
            if(check){
                return res.status(203).json({
                    msg:"can't delete product"
                })
            }else{
                return res.status(200).json({
                    status:200,
                    msg:"delete success"
                })
            }
          
        }catch(error){
            return res.status(500).json({
                status:500,
                message: error.message
            })
        }
    }
}
export default CartController