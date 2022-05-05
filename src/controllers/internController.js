const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const mongoose = require("mongoose");


//avoid for repetetive code
function onlySpaces(str) {
    return /^\s*$/.test(str);
}
//--------------------------------------------------------------------------------------------------
const createIntern = async(req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length != 0) {
            // If collegeId is not entered
            let collegeId = req.body.collegeId;
            if (!collegeId) {
                return res
                    .status(400)
                    .send({ status: false, msg: "collegeId is required" });
            }
            // If collegeId is invalid
            if (!mongoose.Types.ObjectId.isValid(collegeId)) {
                return res
                    .status(400)
                    .send({ status: false, msg: "collegeId is invalid" });
            }

            // If given collegeId is not present in our database
            let validationCollegeId = await collegeModel.findById(collegeId);
            if (!validationCollegeId) {
                return res
                    .status(400)
                    .send({ status: false, msg: "collegeId does not exist" });
            }
            // name validation
            if (!data.name) {
                return res.status(400).send({
                    status: false,
                    msg: " Please enter name for the internship (Required Field)",
                });
            }
            //mobile  validation
            if (!data.mobile) {
                return res.status(400).send({
                    status: false,
                    msg: " Please enter mobile for the internship(Required Field)",
                });
            } else if (onlySpaces(data.mobile) == true) {
                return res.status(400).send({ status: false, msg: "mobile cannot be a empty" });
            }
            let mob = /^[0-9]{10}$/.test(data.mobile);
            if (!mob) {
                return res.status(400).send({ status: false, msg: "please enter valid mobile number" });
            }



            //email validation
            if (!data.email) {
                return res.status(400).send({
                    status: false,
                    msg: " Please enter email for the internship (Required Field)",
                });

            } else if (onlySpaces(data.email) == true) {
                return res.status(400).send({ status: false, msg: "email cannot be a empty" });
            }
            let check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                data.email
            );
            if (!check) {
                return res.status(400)
                    .send({ status: false, msg: " Please enter valid emailid" });
            }
            if (!(data.email === String(data.email).toLowerCase())) {
                return res.status(400).send({
                    status: false,
                    msg: "Capital letters are not allowed in emailid",
                });
            }
        }
        // email duplication check
        let emaildb = await internModel.findOne({ email: data.email }, { email: 1, _id: 0 });
        if (emaildb) {
            return res.status(400).send({
                status: false,
                msg: "We are sorry; this email is already registered",
            });
        }

        //only spaces validation

        for (const [key, value] of Object.entries(req.body)) {
            if (onlySpaces(`${value}`) == true) {
                return res.status(400).send({
                    status: false,
                    msg: "Empty Spaces are not accepted in " + `${key}`,
                });
            }
        }

        let intern = req.body;
        let internCreated = await internModel.create(intern);
        res.status(201).send({ status: true, data: internCreated });

    } catch (err) {
        res.status(500).send({ msg: "Internal Server Error", error: err.message });
    }
};

module.exports.createIntern = createIntern;