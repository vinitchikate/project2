const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const { validatecollage } = require("../Middleware/valid");
const internController = require('../controllers/internController');



router.post('/functionup/colleges', validatecollage, collegeController.createCollege);
router.post('/functionup/interns', internController.createIntern);
router.get("/functionup/collegeDetails", collegeController.getCollegedatail)



module.exports = router;