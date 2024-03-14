import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
const OrderModel = new Schema({
    userId: {type: String},
    productId:{type:ObjectId,ref:'Products'},
    quantity: {type: Number},
    price: {type:Number},
    uploadAt: {type: Date, default: Date.now},
}, {id: true,timestamps:true})


export default mongoose.model("order", OrderModel)