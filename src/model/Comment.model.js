import mongoose, { Schema } from "mongoose";
const Comment = new Schema({
    user_Id: {type: String,ref:'profile'},
    productId:{type: Schema.Types.ObjectId,ref:'Products'},
    content:{type:String},
    likes:{type: Number,default:0},
    createdAt:{type: Date, default: Date.now},
}, {id: true})


export default mongoose.model("comments", Comment)