import mongoose , {Schema }  from "mongoose";
const Profile = new Schema({
    account_id: {
        type: String,
        unique: true,
    },
    fullName:{ type:String},
    address:{ type:String},
    phoneNumber:{ type:String},
    // email: {
    //     type: String,
    //     default:null
        
    // },
    birthday:{type:Date},
    deleted: {type: Boolean, default :false}
},  {id: true, timestamps: true})


export default mongoose.model('profile', Profile)