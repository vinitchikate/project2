const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");



router.post('/functionup/colleges', validatecollage,collegeController.createCollege);


module.exports = router;