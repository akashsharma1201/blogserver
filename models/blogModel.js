import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    auther_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "user",
        require: true
    },
    image: {
        type: String, require: true
    },
    title: {
        type: String, require: true
    },
    summary: {
        type: String, require: true
    },
    content: {
        type: String, require: true
    },
    
    },{ timestamps: true }
    )

const blogModel = mongoose.model("blog", blogSchema)

export { blogModel };