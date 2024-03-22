import { ObjectId } from "mongodb";
import mongoose , {Schema }  from "mongoose";
const Profile = new Schema({
    _id: {
        type: ObjectId,
        auto: true,
        unique: true,
        ref:'order'
    },
    fullName:{ type:String,default:""},
    address:{ type:String,default:""},
    phoneNumber:{ type:String,default:""},
    birthday:{type:Date,default: new Date()},
    note:{type:String}
},  { timestamps: true})


export default mongoose.model('profile', Profile)