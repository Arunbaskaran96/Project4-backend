const express=require("express")
const server=express()

require("./Connection/Configure")

server.listen(8000)