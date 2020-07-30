const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const instSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  courses: [{
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: false,
  }],
});

module.exports = mongoose.model("Instructor", instSchema);
