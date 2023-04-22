import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userRegisterController = async (req, res) => {
    const { name, email, password, rePassword } = req.body;
    console.log(name, email, password, rePassword);
    if (name && email && password && rePassword) {
        if (password == rePassword) {
            const existingUser = await userModel.findOne({ email: email })
            if (!existingUser) {
                try {
                    const saltRounds = 10;
                    const hashPassword = await bcrypt.hash(password, saltRounds)
                    const newUser = await userModel({
                        name: name,
                        email: email,
                        password: hashPassword,
                    })
                    await newUser.save()
                    const savedUser = await userModel.findOne({ email: email });
                    const token = jwt.sign({ userID: savedUser._id }, "dfguinquicisdfbniofioanxaiocniosfnuodnuioancuisdbei", { expiresIn: "5d" })
                    res.json({ "success": true, "message": "Registation is successfull!", "user":savedUser , token })
                } catch (error) {
                    console.log(error);
                }
            } else {
                res.status(200).json({ "success": false, "message": "This email is Already used !" })
            }
        } else {
            res.json({ "success": false, "message": "password and confirm password are not same ! !" })
        }
    } else {
        res.json({ "success": false, "message": "All Field are required !" })
    }
}

const userLoginController = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    if (email && password) {
        try {
            const user = await userModel.findOne({ email: email })
            const isMatchPassword = await bcrypt.compare(password, user.password)
            if (email && isMatchPassword) {
                const token = jwt.sign({ userID: user._id }, "dfguinquicisdfbniofioanxaiocniosfnuodnuioancuisdbei", { expiresIn: "5d" })
                res.json({ success: true, message: "Login is successfull!","user":user , token })
            } else {
                res.status(200).json({ "status": false, "message": 'something went wrong f !' })
            }
        } catch (error) {
            console.log(error);
            res.status(200).json({ "status": false, "message": 'something went wrong !' })
        }
    } else {
        res.status(400).json({ "success": false, "message": "All field are required !" })
    }

}

export { userRegisterController, userLoginController }