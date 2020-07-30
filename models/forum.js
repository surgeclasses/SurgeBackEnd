const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const forumSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  description: {
    type: String,
    required: true,
  },
  screenshots: [
    {
      type: String,
      required: false,
    },
  ],
  upvotes: [{ users: [mongoose.Types.ObjectId], required: false }],
  answers: [
    {
      response: {
        reply: String,
        user: mongoose.Types.ObjectId,
        date: Date,
        upvotes: {
          users: [mongoose.Types.ObjectId],
          required: false,
        },
        comments: [
          {
            comment: String,
            user: mongoose.Types.ObjectId,
          },
        ],
      },
      required: false,
    },
  ],
});

module.exports = mongoose.model("Forum", forumSchema);
