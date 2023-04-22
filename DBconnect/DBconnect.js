import mongoose from "mongoose";
const DATA_BASE_URL = "mongodb+srv://aakaashsharma57:Akash2001@cluster0.d0rdcon.mongodb.net/?retryWrites=true&w=majority"
const DBconnect =async () => {
    try {
        await mongoose.connect(DATA_BASE_URL)
        console.log("DBconnect ... !");
    } catch (error) {
        console.log(error.message);
    }
}

export default DBconnect