const jwt=require("jsonwebtoken")

const jwt_secret="Project4"


module.exports=(req,res,next)=>{
    if(req.headers.authorization){
        const verify=jwt.verify(req.headers.authorization,jwt_secret)
        if(verify){
            req.Token=verify
            next()
        }else{
            res.status.json({message:"Auth expired"})
        }
    }else{
        res.status.json({message:"Auth failed"})
    }
}