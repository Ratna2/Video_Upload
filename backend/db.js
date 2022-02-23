const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/VideoPlayer"

const connectTomongo = ()=>{
    mongoose.connect(URI, ()=>{
        console.log("Connected To Database");
    })
}

module.exports = connectTomongo