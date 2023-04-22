import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";


const verifytoken = async (req, res ,next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1]
            console.log(token);
            const { userID } = jwt.verify(token, "dfguinquicisdfbniofioanxaiocniosfnuodnuioancuisdbei");
            req.user = await userModel.findById(userID).select('-password')
            // console.log("verify" ,req.user);
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
        }
    }
    if (!token) {
        res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
    }
}

export default verifytoken;