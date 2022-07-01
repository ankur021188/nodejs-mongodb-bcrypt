const mongodb = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017"
let db;

connectDB = (callback) => {
    mongodb.connect(URL, {
        useNewURLParser: true,
        useUnifiedTopology: true
    }, (error, result) => {
        db = result.db("node-mongo-bcrypt")
        return callback(error)
    })
}

getDB = () => {
    return db
}

module.exports = {connectDB, getDB}