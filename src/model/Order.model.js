import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
const OrderModel = new Schema({
    productId:{type:ObjectId,ref:'Products'},
    userId: {type: ObjectId,ref:'profile'},
    quantity: {type: Number},
    price: {type:Number},
    idAdmin:{type: ObjectId},
    uploadAt: {type: Date, default: Date.now},
    isPay:{type:Boolean,default:true}
}, {id: true,timestamps:true})


export default mongoose.model("order", OrderModel)