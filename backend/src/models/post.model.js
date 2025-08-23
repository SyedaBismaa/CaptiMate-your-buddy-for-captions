const mongoose = require("mongoose")

const  postSchema = mongoose.Schema({
    image:String,
    caption:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})

const postModel = mongoose.model("post",postSchema)
module.exports=postModel;