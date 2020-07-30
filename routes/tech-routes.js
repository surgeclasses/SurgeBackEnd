const express = require('express');

const router = express.Router();

const techController = require('../controllers/technology-controller');

router.get("/", techController.getAllTechnologies);

router.post("/", techController.postAddTechnology);

module.exports = router;