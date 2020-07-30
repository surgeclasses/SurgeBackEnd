const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  isInstructor: {
    type: Boolean,
    require: true,
  },
  attendingCourses: [{
    type: mongoose.Types.ObjectId,
    require: false,
    ref: "Course"
  }],
  instructingCourses: [{
    type: mongoose.Types.ObjectId,
    require: false,
    ref: "Course"
  }],
  instructorProfile: {
    type: mongoose.Types.ObjectId,
    require: false,
    ref: "Instructor"
  },
});

module.exports = mongoose.model("User", userSchema);
