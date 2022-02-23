const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    videos : [{
        type : String
    }],
},
{
    timestamps : true
})

module.exports = mongoose.model("Media", mediaSchema)