import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, require: true
    },
    email: {
        type: String, require: true, unique: true
    },
    password: {
        type: String, require: true,
    },
    repassword: {
        type: String, require: true,
    }
})


const userModel = mongoose.model("user" ,userSchema);

export {userModel}