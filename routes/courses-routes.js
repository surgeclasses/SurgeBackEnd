const express = require("express");

const courseController = require('../controllers/courses-controller');
const fileUpload = require('../middlewares/file-upload');
const vidUpload = require('../middlewares/video-upload');

const router = express.Router();

router.get("/", courseController.getAllCourses);

router.post("/", courseController.postCreateCourse);

router.get("/:cid", courseController.getCourseById);

router.get("/instructor/:id", courseController.getCoursesByInstructor);

router.patch("/:cid", courseController.updateCourseById);

router.patch("/syllabus/:cid", courseController.updateCourseSyllabus);

router.patch("/addbatch/:cid", courseController.updateCourseBatch);

router.get("/batch/:bid", courseController.getBatchById);

router.patch("/addclasses/:bid", courseController.updateBatchClasses);

router.post("/uploadlecture", courseController.uploadLecture);
router.post("/uploadvideo", courseController.uploadVideo);
router.post("/uploadfiles", courseController.uploadFile);
router.patch("/addmeeturl/:bid", courseController.addMeetUrl);

router.patch("/updateclasses/:bid", courseController.updateClasses);

module.exports = router;
