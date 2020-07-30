const express = require('express');

const router = express.Router();

const forumController = require('../controllers/forum-controller');

router.post("/", forumController.postQuestion);

router.get("/:cid", forumController.getForumByCourseId);

module.exports = router; 