import { ObjectId } from 'mongodb';
import Comment from '../../model/Comment.model.js';
import Product from '../../model/Product.model.js';
class CommentController {
    async getCommentByIdProduct(req,res,next){
        try{
            const idProduct = req.query.id;
            const listComment = await Comment.find({productId:idProduct}).populate('user_Id').exec();
            if(!listComment){
                return res.status(500).json({msg:"err"})
            }
            res.status(200).json({
                data:listComment
            })
        }catch(err){
            res.status(502).json({
                msg:'err from server',
                err:err.message
            })
        }
    }
   async CreateComment(req,res,next){
    try{
        const user_Id = req.user_id;
        const data = req.body;
        const newD = {...data,user_Id};
        console.log("check newD",newD)
        let productId = newD.productId;
        let checkPro = await Product.findOne({_id:productId}).exec();
        if(!checkPro){
            return res.status(402).json({
                msg:"Not exit product"
            })
        }
        const newComment = await Comment.create(newD);
        const getThisComment = await Comment.findById(newComment._id).populate('user_Id').exec();
        res.status(200).json({
            msg:"success",
            data:getThisComment
        })
    }catch(err){
        res.status(500).json({
            msg:err.message
        })
    }
   }
   async UpdateComment(req,res,next){
    try{
        const id = req.query.id;
        const data = req.body;
        console.log('checl data',data)
        const UpdateComment = await Comment.findByIdAndUpdate(id,data,{
            new:true
        });
        if(!UpdateComment) res.status(500).json({
            msg:"err"
        })
        res.status(200).json({
            msg:"success",
            data:UpdateComment
        })
    }catch(err){
        res.status(500).json({
            msg:err.message
        })
    }
   }
   async DeleteComment(req,res,next){
    try{
        const id = req.query.id;
        const deleteComment = await Comment.findByIdAndDelete(id);
        console.log('c',deleteComment)
       
        res.status(200).json({
            msg:"success",
        })
    }catch(err){
        res.status(500).json({
            msg:err.message
        })
    }
   }
}

export default CommentController