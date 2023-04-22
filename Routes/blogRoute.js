import express from "express";
import { getAllBlogs, createBlog, getBlog, updateblog, deleteblog } from "../controllers/blogController.js";
import multer from "multer";
import verifytoken from "../middleware/verifytoken.js";

const upload = multer({
    dest: 'uploads/',

})
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, "uploads")
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.filename + ".jpg")
//         }

//     })
// }).single("blog_image")

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '.jpg') //Appending .jpg
//     }
//   })

//   var upload = multer({ storage: storage });


const route = express.Router()


route.get("/allblog", getAllBlogs)
route.get("/getblog/:id", getBlog)
route.post("/createblog", upload.single("file"), createBlog)
route.put("/updateblog/:id", verifytoken, updateblog)
route.delete("/deleteblog/:id", verifytoken, deleteblog)


// route.get("/allblog", getAllBlogs)
// route.get("/getblog/:id", getBlog)
// route.post("/createblog", upload.single("file"), createBlog)
// route.put("/updateblog/:id", updateblog)
// route.delete("/deleteblog/:id", deleteblog)




export { route as blogRouter }