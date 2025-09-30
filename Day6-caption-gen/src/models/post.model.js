import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    image:String,
    caption:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const postModel = mongoose.model("post",postSchema);

export default postModel;