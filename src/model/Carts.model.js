import mongoose, { Schema } from "mongoose";
const CartsProduct = new Schema({
    userId: {type: String},
    productId:{type: Schema.Types.ObjectId,ref:'Products'},
    quantity:{type: Number}
}, {id: true})


export default mongoose.model("cartsProduct", CartsProduct)