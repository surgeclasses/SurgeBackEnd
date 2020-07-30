const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const techSchema = new Schema({
  title: {
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("Technology", techSchema);
