const express=require("express")
const router=express.Router()

const Bookingmodel=require("../Models/Bookingmodel")
const Authverify=require("./Middleware/Verify")
const Userverify=require("./Middleware/UserVerify")

router.post("/booking/:id",Authverify,Userverify,async(req,res)=>{
    try {
        const newBooking=new Bookingmodel({
            userId:req.Uniqueid,
            roomId:req.params.id,
            from:req.body.from,
            to:req.body.to
        })
        await newBooking.save()
        res.status(200).json({message:"booked"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/bookings",Authverify,Userverify,async(req,res)=>{
    try {
        const bookings=await Bookingmodel.find().populate("userId")
        if(bookings){
            res.status(200).json(bookings)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/booking",Authverify,Userverify,async(req,res)=>{
    try {
        const bookings=await Bookingmodel.find({userId:req.Uniqueid}).populate("roomId")
        if(bookings){
            res.status(200).json(bookings)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


module.exports=router