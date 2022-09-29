var mysql = require("mysql")
var connectionString = "mysql://mjazz1:1mjazz@127.0.0.1/member"
var pool  = mysql.createPool(connectionString)
var con = mysql.createConnection(connectionString)
const jwt = require("jsonwebtoken")
const { expressjwt: expressjwt } = require("express-jwt")

exports.checkStatus = function(request, response) {
    response.send("Server is OK")
}

exports.checkLogin = function(request, response) {
    var {username, password} = request.body
    var sql = " select * from usernames where username = ? and " + " password = sha2(?, 512) "
    var data = [ request.body.username, request.body.password ]
    pool.query(sql, data, function(error, result) {
                                                    if (error == null && result.length == 1) {
                                                        var token = jwt.sign({username}, "webjazz1", {expiresIn: '1d'})
                                                        return response.json({token, username})

                                                        } else {
                                                            response.send("invalid")
                                                    }
                                            })
}

exports.requireLogin = expressjwt({
    secret: "webjazz1",
    algorithms: ["HS256"],
    userProperty: "auth"
})


exports.showData = function(request, response) {
const id = request.params.id
con.query("select * from user where id =?", [id], (err,result) => {
if (err){
console.log(err)
} else {
response.send(result)
}
})
}

exports.listMember = function(request, response) {
pool.query("select * from user", function show(error, data) {
if (error == null) response.send(data)
else response.send(error)
})
}

exports.addMember = function(request, response) {
    const id = request.body.id
    const name = request.body.name
    const surname = request.body.surname
    const gender = request.body.gender
    const telephone = request.body.telephone
    
    con.query('insert into user values(?,?,?,?,?)',[id,name,surname,gender,telephone], (err,result) => {
    if (!err) {
        response.send("Sucess")
    } else {
        console.log(err.message)
        response.send(err)
    }
    })
    }

exports.updateMember = function(request, response) {
        const id = request.params.id
        const name = request.body.name 
        const surname = request.body.surname
        const gender = request.body.gender
        const telephone = request.body.telephone
        con.query("UPDATE user SET name = ?, surname = ?, gender = ?, telephone = ?  WHERE id = ?",
                     [name, surname,gender, telephone,id], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                response.send("Update Success")
            }
        })
        }
        
        exports.deleteMember = function(request, response) {
        const id = request.params.id
        con.query("DELETE FROM user where id = ?", [id], (err, result) => {
            if (err){
                console.log(err)
         } else {
                response.send("Deleted!!!")
         }
        })
        }

