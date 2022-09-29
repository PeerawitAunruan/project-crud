
var express = require("express")
var cors = require("cors")
var server  = express()
var {checkStatus, showData, listMember,addMember,updateMember,
     deleteMember, checkLogin, requireLogin} = require("./controller.js")
server.listen(29100)


server.use(express.json())
server.use(cors())

server.get("/check-status", checkStatus)
server.get("/list-id/:id", showData)
server.get("/list-member",requireLogin, listMember)
server.post("/add-member",requireLogin, addMember)
server.put("/update-member/:id",requireLogin, updateMember)
server.delete("/delete-member/:id",requireLogin, deleteMember)
server.post( "/login", checkLogin)