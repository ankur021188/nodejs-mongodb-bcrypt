const express = require('express')
const app = express()
const {connectDB} = require("./db")
const router = require("./routes/users")

connectDB((err) => {
    app.use(express.json())
    app.use("/users",router)
    app.use((req,res,next)=> {
        const err = new Error("Page not found")
        err.status=404;
       return next(err);
    })
    app.listen(3001, ()=> {console.log('Listening on port 3001')})
})