const UserModel=require("../../Models/UserModel")


module.exports=async(req,res,next)=>{
    if(req.Token.email){
        const user=await UserModel.findOne({email:req.Token.email})
        if(user){
            req.Uniqueid=user._id
            next()
        }else{
            res.status(400).json({message:"no user found"})
        }
    }else{
        res.status(500).json({message:"Something went wrong"})
    }
}