import express from "express";
import { userLoginController, userRegisterController } from "../controllers/userController.js";

const route = express.Router()

route.post("/register" , userRegisterController )
route.post("/login" , userLoginController )




export { route as userRoute }