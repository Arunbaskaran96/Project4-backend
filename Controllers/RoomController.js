const express=require("express")
const router=express.Router()

const RoomModel=require("../Models/RoomModels")
const Authverify=require("./Middleware/Verify")
const Userverify=require("./Middleware/UserVerify")

router.post("/room",Authverify,Userverify,async(req,res)=>{
    try {
        const newRoom=new RoomModel({
            name:req.body.name,
            price:req.body.price,
            img:req.body.img,
            imgs:req.body.imgs,
            des:req.body.des,
            amenities:req.body.amenities,
            location:req.body.location
        })
        await newRoom.save()
        res.status(200).json({message:"created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/rooms",Authverify,Userverify,async(req,res)=>{
    try {
        const rooms=await RoomModel.find()
        if(rooms){
            res.status(200).json(rooms)
        }else{
            res.status(200).json({message:"no room found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

// router.get("/roomlocation/:id",Authverify,Userverify,async(req,res)=>{
//     try {
//             const rooms=await RoomModel.find({location:req.params.id})
//     if(rooms){
//         res.status(200).json(rooms)
//     }else{
//         res.status(200).json({message:"no rooms found"})
//     }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message:"something went wrong"})
//     }
// })

router.get("/city",async(req,res)=>{

    const{cities,limit}=req.query
    
    try {
        const rooms=await RoomModel.find({location:cities}).limit(limit)
        if(rooms){
            res.status(200).json(rooms)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/room/:id",Authverify,Userverify,async(req,res)=>{
    try {
        const rooms=await RoomModel.findOne({_id:req.params.id})
    if(rooms){
        res.status(200).json(rooms)
    }else{
        res.status(200).json({message:"no rooms found"})
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.put("/room/:id",Authverify,Userverify,async(req,res)=>{
    try {
        await RoomModel.findOneAndUpdate({_id:req.params.id},{$set:req.body})
        res.status(200).json({message:"updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"}) 
    }
})

router.delete("/room/:id",Authverify,Userverify,async(req,res)=>{
    try {
        await RoomModel.findByIdAndDelete({_id:req.params.id},{$set:req.body})
        res.status(200).json({message:"updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"}) 
    }
})

module.exports=router