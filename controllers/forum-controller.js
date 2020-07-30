const Forum = require("../models/forum");

const postQuestion = async (req, res, next) => {
  const { question, date, description, course } = req.body;
  const forum = new Forum({
    question,
    date,
    description,
    course,
    upvotes: [],
    answers: [],
  });

  forum
    .save()
    .then((result) => {
      console.log("Forum: " + result);
      res.status(201).json({ message: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getForumByCourseId = async (req, res, next) => {
  const cid = req.params.cid;
  let forum;
  try {
    forum = await Forum.find({ course: cid });
  } catch (err) {
    return next(new HttpError("Could not find the user for the given id", 500));
  }
  if (!forum) {
    return next(new HttpError("Could not find the user for the given id", 404));
  }
  console.log("Found Questions: " + forum);
  res.json(forum);
};

exports.postQuestion = postQuestion;
exports.getForumByCourseId = getForumByCourseId;
