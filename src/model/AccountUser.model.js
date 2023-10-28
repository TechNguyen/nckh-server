import mongoose, { Schema, Types } from "mongoose";
const AccountUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Password length must greater 8']
    },
    createat: {type: Date, default: Date.now},
    updateat: {type: Date, default: null},
    deleteat: {type: Date, default: null},
    deleted: {type: Number, default: 0},
    refreshToken: {
        type: String,
        default: null
    }
}, {id: true});

module.exports = mongoose.model('AccountUsers', AccountUserSchema)

























