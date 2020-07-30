const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const batchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isStarted: {
    type: Boolean,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
  },
  classes: {
    classes: [
      {
        title: String,
        date: Date,
        isComplete: Boolean,
        isRunning: Boolean,
        meetUrl: String,
        topicsCovered: [String],
        videoUrl: String,
        filesPath: String,
      },
    ],
    required: false,
  },
});

module.exports = mongoose.model("Coursebatch", batchSchema);
