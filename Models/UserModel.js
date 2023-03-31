const mongoose=require("mongoose")

const UserModel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }
})

module.exports=mongoose.model("user",UserModel)