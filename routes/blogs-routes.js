const express = require('express');

const blogController = require('../controllers/blog-controller');

const router = express.Router();

router.get("/", blogController.getAllBlogs);

router.post("/", blogController.postCreateBlog);

router.get("/:bid", blogController.getBlogById);

module.exports = router;