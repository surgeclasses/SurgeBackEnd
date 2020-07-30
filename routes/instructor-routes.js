const express = require('express');

const instructorController = require('../controllers/instructor-controller');

const router = express.Router();

router.post('/', instructorController.postCreateInstructor);

router.get('/', instructorController.getAllInstructors);

router.get('/:id', instructorController.getInstructorById);

module.exports = router;