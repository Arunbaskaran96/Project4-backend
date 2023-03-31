const mongoose=require("mongoose")

const RoomModel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    imgs:{
        type:Array,
        required:true
    },
    amenities:{
        type:Array,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    unAvailableDates:{
        type:Array
    }
})


module.exports=mongoose.model("room",RoomModel)