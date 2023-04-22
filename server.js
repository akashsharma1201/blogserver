import express from "express";
import { userRoute } from "./Routes/user.js";
import DBconnect from "./DBconnect/DBconnect.js";
import cors from "cors";
import { blogRouter } from "./Routes/blogRoute.js";
// import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const moduleURL = import.meta.url;

// Convert the module's URL to a file path
const modulePath = fileURLToPath(moduleURL);
const moduleDirname = dirname(modulePath);
// dotenv.config()


const app = express()


// dotenv.config()
// ------------DATABASE CONNECT--------
DBconnect()


// ------------Middle Ware-------------
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(moduleDirname + '/uploads'));


// ------------Routes-------------
app.use("/app/api/user" , userRoute)
app.use("/app/api/blog" , blogRouter)





const port = process.env.PORT || 5000 ;


app.listen(port , ()=> {
    console.log(`server is running on ${port} port`)
})


// console.log(4+4);