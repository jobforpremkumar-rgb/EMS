import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    email : {
        type:String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    }
})


const auth = mongoose.model("auth" , authSchema)

export default auth;