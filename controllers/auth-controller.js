const HttpError = require("../models/http-error");
const User = require("../models/users");
const Course = require("../models/course");
const { all } = require("../routes/auth-routes");

const postCreateUser = (req, res, next) => {
  const { name, email, mobile, uid } = req.body;

  const user = new User({
    name,
    email,
    mobile,
    uid,
  });

  user
    .save()
    .then((result) => {
      console.log("Created User: " + result);
      res.status(201).json({ message: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllUsers = async (req, res, next) => {
  let USERS = [];
  await Blog.find()
    .then((result) => {
      USERS = result;
    })
    .catch((err) => {
      console.log(err);
    });

  if (USERS.length < 1) {
    return next(new HttpError("Could not find any users", 404));
  }

  res.json(USERS);
};

const getUserByEmail = async (req, res, next) => {
  const email = req.params.email;
  console.log("user request for :" + email);
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Could not find the user for the given id", 500));
  }
  if (!user) {
    return next(new HttpError("Could not find the user for the given id", 404));
  }
  res.json(user);
};

const getUserCourses = async (req, res, next) => {
  const email = req.params.email;
  console.log("user request for :" + email);
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Could not find the user for the given id", 500));
  }
  if (!user) {
    return next(new HttpError("Could not find the user for the given id", 404));
  }

  let courses;
  try {
    courses = await Course.find({
      _id: { $in: user.attendingCourses },
    });
  }catch(err){
    console.log(err);
  }
  if (!courses) {
    return next(new HttpError("Could not find the courses for the given id", 404));
  }
  res.json(courses);
};

const postMakeInstructor = async (req, res, next) => {
  const id = req.params.uid;
  const { instructorProfile } = req.body;

  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return next(new HttpError("Could not find the user for the given id", 500));
  }
  if (!user) {
    return next(new HttpError("Could not find the user for the given id", 404));
  }
  user.isInstructor = true;
  user.instructorProfile = instructorProfile;
  try {
    await user.save();
  } catch (err) {
    return next(new HttpError("Could not save the changes", 500));
  }

  res.json(user);
};

const postAddMyCourse = async (req, res, next) => {
  const { email, courseId } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Could not find the user for the given email", 500)
    );
  }
  if (!user) {
    return next(
      new HttpError("Could not find the user for the given email", 404)
    );
  }
  let allCourses = [...user.attendingCourses, courseId];
  user.attendingCourses = allCourses;
  try {
    await user.save();
  } catch (err) {
    return next(new HttpError("Could not save the changes", 500));
  }

  res.json(user);
};

exports.getUserCourses = getUserCourses;
exports.getAllUsers = getAllUsers;
exports.getUserByEmail = getUserByEmail;
exports.postCreateUser = postCreateUser;
exports.postMakeInstructor = postMakeInstructor;
exports.postAddMyCourse = postAddMyCourse;
