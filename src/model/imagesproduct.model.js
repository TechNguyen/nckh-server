import mongoose, { Schema } from "mongoose";
const imagesProduct = new Schema({
    name: {type: String},
    imgUrl:{type:String},
    extension: {type: String},
    uploadAt: {type: Date, default: Date.now},
    ProductID: {type: Schema.Types.ObjectId, ref: 'Products'},
}, {id: true})


export default mongoose.model("imagesProduct", imagesProduct)