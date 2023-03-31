const express=require("express")
const router=express.Router()

const UserModel=require("../../Models/UserModel")
const bcrypt=require("bcrypt")

const Authverify=require("../Middleware/Verify")
const Userverify=require("../Middleware/UserVerify")

router.post("/user",async(req,res)=>{
    try {
        const checkUser=await UserModel.findOne({email:req.body.email})
        if(!checkUser){
            const salt=await bcrypt.genSalt(10)
            const hash=await bcrypt.hash(req.body.password,salt)
            req.body.password=hash
    
            const newUser=new UserModel({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                mobile:req.body.mobile,
                city:req.body.city,
            })
            await newUser.save()
            res.status(200).json({message:"created"})
        }else{
            res.status(400).json({message:"user already exists"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/users",async(req,res)=>{
    try {
       const users= await UserModel.find()
       res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/user",Authverify,Userverify,async(req,res)=>{
    try {
       const users= await UserModel.findOne({_id:req.Uniqueid})
       res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.put("/user",Authverify,Userverify,async(req,res)=>{
    try {
       const users= await UserModel.findOneAndUpdate({_id:req.Uniqueid},{
        $set:req.body
       })
       res.status(200).json({message:"updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


module.exports=router