const express = require('express');

const studentController = require('../controllers/student-controller');

const router = express.Router();

router.get('/:sid', studentController.getStudentById);

router.get('/forum/:cid', studentController.getForumByCourse);

router.post('/forum/:cid', studentController.createForumQuestion);

module.exports = router;