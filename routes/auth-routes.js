const express = require('express');

const router = express.Router();

const userController = require('../controllers/auth-controller');

router.get("/findcourses/:email", userController.getUserCourses);

router.get("/:email", userController.getUserByEmail);

router.post("/makeinstructor/:uid", userController.postMakeInstructor);

router.patch("/addmycourse/", userController.postAddMyCourse);

router.post("/", userController.postCreateUser);

module.exports = router;