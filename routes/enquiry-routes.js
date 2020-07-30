const express = require('express');

const router = express.Router();

const enquiryController = require('../controllers/enquiry-controller');

router.post("/", enquiryController.postEnquiry);

router.get("/", enquiryController.getAllEnquiries);

router.patch("/:eid", enquiryController.updateEnquiry);

module.exports = router;