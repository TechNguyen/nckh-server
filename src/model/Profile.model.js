import mongoose , {Schema }  from "mongoose";
const Profile = new Schema({
    account_id: {
        type: String,
        unique: true,
    },
    fullName:{ type:String,default:""},
    address:{ type:String,default:""},
    phoneNumber:{ type:String,default:""},
    birthday:{type:Date,default: new Date()},
    note:{type:String}
},  {id: true, timestamps: true})


export default mongoose.model('profile', Profile)