const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enquirySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  mobile: {
    type: String,
    require: true
  },
  course: {
    type: String,
    require: true,
  },
  isContacted: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("Enquiry", enquirySchema);
