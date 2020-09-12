const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const Course = require("../models/course");
const Batch = require("../models/coursebatch");
const Lecture = require("../models/lecture");
const mongoose = require("mongoose");

let COURSES = [];

const postCreateCourse = (req, res, next) => {
  const {
    title,
    fee,
    technology,
    description,
    instructor,
    duration,
    isLive,
    startDate,
  } = req.body;

  const avgRating = 0;
  const numberOfReviews = 0;

  const course = new Course({
    title,
    fee,
    technology,
    description,
    instructor,
    duration,
    isLive,
    startDate,
    avgRating,
    numberOfReviews,
  });

  course
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllCourses = async (req, res, next) => {
  // console.log("Get Request in Courses");
  await Course.find()
    .then((result) => {
      COURSES = result;
    })
    .catch((err) => {
      console.log(err);
    });

  if (COURSES.length < 1) {
    return next(new HttpError("Could not find any course", 404));
  }

  res.json(COURSES);
};

const getCourseById = async (req, res, next) => {
  const courseId = req.params.cid;
  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    return next(
      new HttpError("Could not find the course for the given id", 500)
    );
  }
  if (!course) {
    return next(
      new HttpError("Could not find the course for the given id", 404)
    );
  }
  res.json(course);
};

const getCoursesByInstructor = async (req, res, next) => {
  const instructorId = req.params.id;
  let courses;
  try {
    courses = await Course.find({ "instructor.id": instructorId });
  } catch (err) {
    return next(
      new HttpError("Could not find the course for the given id", 500)
    );
  }
  if (!courses) {
    return next(
      new HttpError("Could not find the course for the given id", 404)
    );
  }
  res.json(courses);
};

const updateCourseById = async (req, res, next) => {
  const courseId = req.params.cid;
  const {
    title,
    fee,
    technology,
    description,
    instructor,
    duration,
    isLive,
    startDate,
  } = req.body;

  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    return next(
      new HttpError("Could not find the course for the given id", 500)
    );
  }

  course.title = title;
  course.fee = fee;
  course.technology = technology;
  course.description = description;
  course.instructor = instructor;
  course.duration = duration;
  course.isLive = isLive;
  course.startDate = startDate;

  try {
    await course.save();
  } catch (err) {
    return next(new HttpError("Could not save the changes", 500));
  }

  res.status(200).json(course);
};

const getBatchById = async (req, res, next) => {
  const batchId = req.params.bid;
  let batch;
  try {
    batch = await Batch.findById(batchId);
  } catch (err) {
    return next(
      new HttpError("Could not find the course for the given id", 500)
    );
  }
  if (!batch) {
    return next(
      new HttpError("Could not find the course for the given id", 404)
    );
  }
  res.json(batch);
};

const updateCourseBatch = async (req, res, next) => {
  const courseId = req.params.cid;
  const { name, startDate } = req.body;
  console.log(req.body);

  const isStarted = true;
  const isComplete = false;
  const classes = {
    classes: [
      {
        title: "Class 1",
        date: startDate,
        isComplete: false,
        isRunning: false,
        meetUrl: "",
        topicsCovered: [],
        videoUrl: "",
        filesPath: "",
      },
    ],
  };

  const batch = new Batch({
    name,
    isStarted,
    isComplete,
    classes: classes,
  });

  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    return next(
      new HttpError("Could not find the course for the given id", 500)
    );
  }

  batch
    .save()
    .then(async (result) => {
      console.log(result);
      course.batch = result._id;
      await course.save();
    })
    .catch((err) => {
      console.log(err);
      return next(new HttpError("Could not save the changes", 500));
    });

  res.status(200).json(course);
};

const updateBatchClasses = async (req, res, next) => {
  const batchId = req.params.bid;
  const { classes } = req.body;

  let batch;
  try {
    batch = await Batch.findById(batchId);
  } catch (err) {
    return next(
      new HttpError("Could not find the course for the given id", 500)
    );
  }

  batch.classes.classes = classes;

  batch
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      return next(new HttpError("Could not save the changes", 500));
    });

  res.status(200).json(batch);
};

const updateClasses = async (req, res, next) => {
  const batchId = req.params.bid;

  const { title, date, classIndex, currentClass } = req.body;
  const nextClass = {
    title: title,
    date: date,
    isComplete: false,
    isRunning: false,
    meetUrl: "",
    topicsCovered: [],
    videoUrl: "",
    filesPath: "",
  };
  console.log(classIndex);
  console.log(currentClass);

  let batch;
  try {
    batch = await Batch.findById(batchId);
    // batch.classes.classes[classIndex] = {...currentClass};// THIS NOT WORKING.. CHECK
    batch.classes.classes.splice(classIndex, 1, currentClass);
    batch.classes.classes.push(nextClass);
  } catch (err) {
    return next(
      new HttpError("Could not find the course for the given id", 500)
    );
  }

  batch
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      return next(new HttpError("Could not save the changes", 500));
    });

  res.status(200).json(batch);
};

const addMeetUrl = async (req, res, next) => {
  const batchId = req.params.bid;

  const { meetUrl, classIndex } = req.body;

  let batch;
  try {
    batch = await Batch.findById(batchId);
  } catch (err) {
    return next(
      new HttpError("Could not find the course for the given id", 500)
    );
  }

  batch.classes.classes[classIndex].meetUrl = meetUrl;

  batch
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      return next(new HttpError("Could not save the changes", 500));
    });

  res.status(200).json(batch);
};

const uploadFile = (req, res) => {
  const chosenFile = req.files.classdocs;
  let temp = chosenFile.name.split(".");
  const ext = temp[temp.length - 1];
  const filePath = `uploads/classfiles/${uuidv4()}.${ext}`;
  chosenFile.mv(filePath, function (err) {
    if (err) return res.status(500).send(err);
    res.status(200).json({ path: filePath });
  });
};

const uploadVideo = (req, res) => {
  const chosenFile = req.files.classvideo;
  let temp = chosenFile.name.split(".");
  const ext = temp[temp.length - 1];
  const filePath = `uploads/classvideos/${uuidv4()}.${ext}`;
  chosenFile.mv(filePath, function (err) {
    if (err) return res.status(500).send(err);
    res.status(200).json({ path: filePath });
  });
};

const uploadLecture = async (req, res) => {
  const { courseId, titleIndex, topicIndex } = req.body;
  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    return next(
      new HttpError("Could not find the course for the given id", 500)
    );
  }

  const chosenFile = req.files.lecture;
  let temp = chosenFile.name.split(".");
  const ext = temp[temp.length - 1];
  const filePath = `uploads/lectures/${uuidv4()}.${ext}`;
  chosenFile.mv(filePath, (err) => {
    if (err) return res.status(500).send(err);
  });

  const newLecture = new Lecture({
    title,
    videoPath: filePath,
    duration,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newLecture.save({ session: sess });
    course.syllabus[titleIndex].topics[topicIndex].lecture = newLecture;
    await course.save({ session: sess });

    await sess.commitTransaction();
  } catch (error) {}
  
  res.status(201).json({ message: "success", course: data });
};

const updateCourseSyllabus = async (req, res, next) => {
  const courseId = req.params.cid;
  const { syllabus } = req.body;

  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    return next(
      new HttpError("Could not find the course for the given id", 500)
    );
  }

  course.syllabus = syllabus;

  try {
    await course.save();
  } catch (err) {
    return next(new HttpError("Could not save the changes", 500));
  }

  res.status(200).json(course);
};

exports.getAllCourses = getAllCourses;
exports.getCourseById = getCourseById;
exports.updateCourseById = updateCourseById;
exports.updateCourseSyllabus = updateCourseSyllabus;
exports.postCreateCourse = postCreateCourse;
exports.updateCourseBatch = updateCourseBatch;
exports.updateBatchClasses = updateBatchClasses;
exports.updateClasses = updateClasses;
exports.getCoursesByInstructor = getCoursesByInstructor;
exports.getBatchById = getBatchById;
exports.uploadFile = uploadFile;
exports.uploadVideo = uploadVideo;
exports.uploadLecture = uploadLecture;
exports.addMeetUrl = addMeetUrl;
