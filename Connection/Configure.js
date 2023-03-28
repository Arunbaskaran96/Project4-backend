const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://admin:Project4@cluster0.87azvbd.mongodb.net/?retryWrites=true&w=majority").then(result=>{
    console.log("Connected")
}).catch(err=>{
    console.log(err,"error")
})