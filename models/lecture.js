const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lectureSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    videoPath:{
        type: String,
        require: true
    },
    duration:{
        type: String,
        require: true
    },
    resourcePath:{
        type: String,
        require: false
    }    
});

module.exports = mongoose.model("Lecture", lectureSchema);