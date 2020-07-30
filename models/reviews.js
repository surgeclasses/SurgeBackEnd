const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review:{
        type: String,
        require: true
    },
    stars:{
        type: Number,
        require: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    courseId:{
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Course'
    }    
});

module.exports = mongoose.model("Review", reviewSchema);