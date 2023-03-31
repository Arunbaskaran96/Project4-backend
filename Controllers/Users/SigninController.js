const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const jwt_secret="Project4"
const bcrypt=require("bcrypt")

const UserModel=require("../../Models/UserModel")

router.post("/login",async(req,res)=>{
    try {
        const user=await UserModel.findOne({email:req.body.email})
        if(user){
            const compare=await bcrypt.compare(req.body.password,user.password)
            if(compare){
                const userIdentity={
                    email:user.email,
                    _id:user._id
                }
                const token=jwt.sign(userIdentity,jwt_secret,{expiresIn:"50m"})
                res.status(200).json({message:"user found",token})
            }else{
                res.status(400).json({message:"Incorrect username/password"})
            }
        }else{
            res.status(400).json({message:"no user found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})



module.exports=router