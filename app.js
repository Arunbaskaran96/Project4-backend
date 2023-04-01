const express=require("express")
const app=express()

const cors=require("cors")
const bodyparser=require("body-parser")

app.use(cors())
app.use(bodyparser.json())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const SignupController=require("./Controllers/Users/SignupController")
const SigninController=require("./Controllers/Users/SigninController")
const RoomController=require("./Controllers/RoomController")
const BookingController=require("./Controllers/BookingController")

app.use("/",SignupController)
app.use("/",SigninController)
app.use("/",RoomController)
app.use("/",BookingController)

module.exports=app