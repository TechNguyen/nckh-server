import mongoose , {Schema }  from "mongoose";
const Trademark = new Schema({
    name: {
        type: String,
        unique: true,
    },
    createat: {type: Date, default: Date.now},
    updateat: {type: Date, default: null},
    deleteat: {type: Date, default: null},

},  {id: true})


export default mongoose.model('trademark', Trademark)