const mongoose = require("../models/internModel");

const createIntern = async function(req, res) {
    try {

    } catch (err) {
        res.status(500).send({ msg: "Internal Server Error", error: err.message });
    }
};

module.exports.createIntern = createIntern;

// look like this
// {
//     "isDeleted" : false,
//     "name" : "Jane Does",
//     "email" : "jane.doe@iith.in",
//     "mobile" : "90000900000",
//     "collegeId" : ObjectId("888771129c9ea621dc7f5e3b")
// }