const HttpError = require("../models/http-error");

const DUMMY_FORUM = [
  {
    id: "f1",
    title: "Question Title",
    description: "Description of the asked question",
    course: "c1"
  }
];

const getStudentById = (req, res, next) => {
  console.log("Get Request in Student");
  res.json({ message: "Working Route" });
};

const createForumQuestion = (req, res, next) => {
  const { title, description, course } = req.body;
  const createdQuestion = {
    title,
    description,
    course,
  };
  DUMMY_FORUM.push(createdQuestion);
  res.status(201).json(createdQuestion);
};

const getForumByCourse = (req, res, next) => {
  const courseId = req.params.cid;
  const forum = DUMMY_FORUM.find((tempCourse) => {
    return tempCourse.course === courseId;
  });

  if (!forum) {
    return next(
      new HttpError("Could not find any questions in the forum", 404)
    );
  }
  res.json(forum);
};

exports.getStudentById = getStudentById;
exports.createForumQuestion = createForumQuestion;
exports.getForumByCourse = getForumByCourse;
