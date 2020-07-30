const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : {
        type: String,
        required: true        
    },
    technology : {
        type: String,
        required: true
    },
    keywords : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    metadata : {
        type: String,
        required: true
    },
    date : {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Blog', blogSchema);
