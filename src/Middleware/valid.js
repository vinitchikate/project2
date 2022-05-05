const collageModel = require('../models/collegeModel');

const validatecollage = async function(req, res, next) {
    try {
        let data = req.body
        const { name, fullName, logoLink } = data

        if (Object.keys(data).length != 0) {
            if (data.name === undefined) {
                return res.status(400).send({ status: false, msg: "Name is Missing !!" });
            }
            if (data.fullName === undefined) {
                return res.status(400).send({ status: false, msg: "FullName is Missing !!" });
            }
            if (data.logoLink === undefined) {
                return res.status(400).send({ status: false, msg: "logoLink Missing!!" });
            }
        } else {
            return res.status(400).send({ msg: "Mandatory field Missing!!" })
        }

        if (Object.values(name).length <= 0) {
            return res.status(400).send("The name is required");
        }
        let collageName = await collageModel.findOne({ name: name })
        if (collageName) {
            return res.status(400).send("This Name is already exists");
        }
        if (Object.values(fullName).length <= 0) {
            return res.status(400).send("The fullName is required");
        }
        if (Object.values(logoLink).length <= 0) {
            return res.status(400).send("The logoLink is required");
        } else {
            next()
        }
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}


module.exports.validatecollage = validatecollage;