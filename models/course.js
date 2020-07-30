const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: {
      name: String,
      id: {
        type: mongoose.Types.ObjectId,
        ref: "Instructor",
      },
    },
    required: true,
  },
  technology: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Technology",
  },
  fee: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  isLive: {
    type: Boolean,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: false,
  },
  batch: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  syllabus: [
    {
      title: String,
      topics: [
        {
          type: String,
        },
      ],
      required: false,
    },
  ],
  avgRating: {
    type: Number,
    required: true,
  },
  numberOfReviews: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Review",
    },
  ],
  videosList: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Lecture",
    },
  ],
});

module.exports = mongoose.model("Cousre", courseSchema);
