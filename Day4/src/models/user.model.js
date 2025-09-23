import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ // schema design
    username:String,
    password:String,
}, {timestamps:true})

const userModel = mongoose.model("user", userSchema); // create a collection named users

export default userModel;