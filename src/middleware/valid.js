const validateEmail = require('email-validator');
const authorModel = require('../models/authorModel');

// amitvsk //Kirtan-G
const validateAuthor = async function (req, res, next) {
    try {
        let data = req.body;
        const { firstname, lastname, title, email, password } = data

        if (Object.keys(data).length != 0) {
            if (data.firstname === undefined) {
                return res.status(400).send({ status: false, msg: "Firstname Required !!" });
            }
            if (data.lastname === undefined) {
                return res.status(400).send({ status: false, msg: "Lastname Required !!" });
            }
            if (data.title === undefined) {
                return res.status(400).send({ status: false, msg: "Title Required !!" });
            }
            if (data.email === undefined) {
                return res.status(400).send({ status: false, msg: "Email Required !!" });
            }
            if (data.password === undefined) {
                return res.status(400).send({ status: false, msg: "Password Required !!" });
            }
        }
        else {
            return res.status(400).send({ msg: "Mandatory field Missing!!" })
        }
        
        if(!validateEmail.validate(data.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" })

        if (Object.values(firstname).length <= 0) {
            return res.status(400).send("The firstname is required");
        }
        if (Object.values(lastname).length <= 0) {
            return res.status(400).send("The lastname is required");
        }
        if (Object.values(title).length <= 0) {
            return res.status(400).send("The title is required");
        }
        if (Object.values(email).length <= 0) {
            return res.status(400).send("The email is required and unique");
        }
        let author = await authorModel.findOne({email:email})
        if(author){
            return res.status(400).send("This email is already exists");
        }
        if (Object.values(password).length <= 0) {
            return res.status(400).send("The password is required");
        } else {
            next()
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports.validateAuthor = validateAuthor;

// amitvsk //Kirtan-G //Salman-110
const validateblog = async function (req, res, next) {
    try {
        let data = req.body
        const { title, body, authorId, category } = data

        if (Object.keys(data).length != 0) {
            if (data.title === undefined) {
                return res.status(400).send({ status: false, msg: "Title missing!!" });
            }
            if (data.body === undefined) {
                return res.status(400).send({ status: false, msg: "Blog Body required!!" });
            }
            if (data.authorId === undefined) {
                return res.status(400).send({ status: false, msg: "AuthrId is Required!!" });
            }
            if (data.category === undefined) {
                return res.status(400).send({ status: false, msg: "Category is Required!!" });
            }
        }
        else {
            return res.status(400).send({ msg: "Mandatory field Missing!!" });
        }

        if (Object.values(title).length <= 0) {
            return res.status(400).send("TITLE MISSING!!");
        }
        if (Object.values(body).length <= 0) {
            return res.status(400).send("BODY MISSING!!");
        }
        if (Object.values(authorId).length <= 0) {
            return res.status(400).send("AUTHORID MISSSING!!");
        }

        let authorid = await authorModel.findById(authorId)
        if (!authorid) {
            return res.status(400).send('ENTER VALID AUTHORID!!');
        }
        if (Object.values(category).length <= 0) {
            return res.status(400).send("CATEGORY MISSING!!");
        } else {
            next()
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports.validateblog = validateblog;
