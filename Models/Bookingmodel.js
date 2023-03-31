const mongoose=require("mongoose")

const BookingModel=mongoose.Schema({
    userId:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    roomId:{
        ref:"room",
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("booking",BookingModel)