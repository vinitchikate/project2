const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const { validatecollage } = require("../Middleware/valid");



router.post('/functionup/colleges', validatecollage, collegeController.createCollege);


module.exports = router;