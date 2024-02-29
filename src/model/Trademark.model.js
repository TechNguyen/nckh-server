import mongoose , {Schema }  from "mongoose";
const Trademark = new Schema({
    name: {
        type: String,
        unique: true,
        match: /^[a-zA-Z\sáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]+$/u
    },
    deleted: {type: Boolean, default :false}
},  {id: true, timestamps: true})


export default mongoose.model('trademark', Trademark)