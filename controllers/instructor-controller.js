const HttpError = require("../models/http-error");
const Instructor = require("../models/instructor");

const postCreateInstructor = (req, res, next) => {
  const { name, experience, description, user } = req.body;

  const instructor = new Instructor({ name, experience, description, user });

  instructor
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getInstructorById = async (req, res, next) => {
  const id = req.params.id;
  let instructor;
  try {
    instructor = await Instructor.findById(id);
  } catch (err) {
    return next(new HttpError("Could not find the instructor for the given id", 500));
  }
  if (!instructor) {
    return next(new HttpError("Could not find the instructor for the given id", 404));
  }
  res.json(instructor);
};

const getAllInstructors = async (req, res, next) => {
  let instructor;
  try {
    instructor = await Instructor.find();
  } catch (err) {
    return next(new HttpError("Could not find the instructor for the given id", 500));
  }
  if (!instructor) {
    return next(new HttpError("Could not find the instructor for the given id", 404));
  }
  res.json(instructor);
};

exports.getInstructorById = getInstructorById;
exports.postCreateInstructor = postCreateInstructor;
exports.getAllInstructors = getAllInstructors;
