const express = require('express')
const router = express.Router()
const {getDB} = require("../db")
const bcrypt = require("bcrypt")

router.get("/", (req,res, next) => {
    try{
        const db = getDB()
        const users = db.collection("users")
        users.find().toArray((err, result) => {
            if(err){
            return res.status(500).json({err:err})
            }
            return res.status(200).json({result: result})
        })
    }catch(e){
        return next(e)
    }    
});

router.post("/", async (req,res,next) => {
    const db = getDB()
    const users = db.collection("users")
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    users.insertOne({username: req.body.username, password: hashedPwd}, (err, result) => {
        if(err){
            return res.status(500).json({err:err})
        }
        return res.status(200).json({result: result})
    })
})

module.exports = router;