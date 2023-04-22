import { blogModel } from "../models/blogModel.js";
import path from "path";
import fs from "fs"
import { userModel } from "../models/userModel.js";

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.status(200).json({ "blogs": blogs, "message": "all blogs" })
    } catch (error) {
        res.status(200).json({ "message": "somethings went wrong" })
    }
    

    // res.send("get all")
}

const createBlog = async (req, res) => {
    console.log(req.file);
    const { originalname, path } = req.file
    const parts = originalname.split(".");
    const ext = parts[1]
    const newpath = path + "." + ext;
    fs.renameSync(path, newpath)
    const { title, summary, content } = req.body
    console.log(req.body);
    try {
        const newblog = await blogModel({
            title,
            summary,
            content,
            image: newpath,
        })
        newblog.save();
        res.json({ "message": "blog created", "blog": newblog })
    } catch (error) {
        console.log(error.message);
        res.json({ message: "unable to create blog" })
    }

}

const getBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id).populate("auther_id");
        res.status(200).json({ "blogs": blog, "message": "single blog" })
    } catch (error) {
        res.status(200).json({ "message": "somethings went wrong" })
    }
}



const updateblog = async (req, res) => {

    try {
        const updatedblog = await blogModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ "updatedblog": updatedblog, "message": "updated blog" })
    } catch (error) {
        res.status(200).json({ "message": "somethings went wrong" })
    }

}

const deleteblog = async (req, res) => {
    // const {id} = req.params;
    // const {email} =req.user;
    // const blog = await blogModel.findById(id).populate("auther_id")
    // const user = await userModel.findOne({email :email});
    // console.log("deleteblog user",userLL);
    // console.log("deleteblog blog",blog);
    // console.log("controller",req.user);



    try {
        const deleteblog = await blogModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ "message": " blog deleted"  })
    } catch (error) {
        res.status(200).json({ "message": "somethings went wrong" })
        
    }



}

export { getAllBlogs, createBlog, getBlog, updateblog, deleteblog }