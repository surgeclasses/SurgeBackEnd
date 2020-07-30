const express = require('express');

const contactController = require('../controllers/contact-controller');

const router = express.Router();

// router.get("/", contactController.getAllBlogs);

router.post("/", contactController.postCreateContact);

// router.get("/:bid", contactController.getBlogById);

module.exports = router;    