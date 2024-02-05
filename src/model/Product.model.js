import { Schema } from "mongoose";



const product = new Schema({
    productName: {
        type: String,
        required: [true, "Product Name required"]
    },
    createAt: {type: Date, default: Date.now},
    updateAt: {},
    quanlity: {type: Number},
    deleteAt: {type: Date}
})