const mongoose = require("../models/internModel");

const createIntern = async function(req, res) {
    try {

    } catch (err) {
        res.status(500).send({ msg: "Internal Server Error", error: err.message });
    }
};

module.exports.createIntern = createIntern;