const mysql = require("mysql2")
const cors = require("cors")
const express = require("express")
const app = express()
app.use(cors())
app.use(express.json())
const db = mysql.createConnection({
    host:"mysql-1138fe1b-venky123.h.aivencloud.com",
    user:"avnadmin",
    password:"venky2424",
    database:"defaultdb",
    port:10072,
    ssl:{
        rejectUnauthorized:false
    }
})
db.connect(function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("Connected to MySQL")
    }
})
app.post("/students", function(req,res){

    let name = req.body.name
    let age = req.body.age

    db.query(
        "INSERT INTO students(name,age) VALUES(?,?)",
        [name,age],
        function(err,result){
            if(err){
                res.send(err)
            }
            else{
                res.send("Student Added")
            }
        }
    )
})
app.get("/students", function(req,res){

    db.query(
        "SELECT * FROM students",
        function(err,result){

            if(err){
                res.send(err)
            }
            else{
                res.json(result)
            }

        }
    )

})
app.put("/students/:id", function(req,res){

    let id = req.params.id
    let name = req.body.name
    let age = req.body.age

    db.query(
        "UPDATE students SET name=?, age=? WHERE id=?",
        [name, age, id],
        function(err,result){

            if(err){
                res.send(err)
            }
            else{
                res.send("Student Updated")
            }

        }
    )

})
app.delete("/students/:id", function(req,res){

    let id = req.params.id

    db.query(
        "DELETE FROM students WHERE id=?",
        [id],
        function(err,result){

            if(err){
                res.send(err)
            }
            else{
                res.send("Student Deleted")
            }

        }
    )

})
app.listen(3000)