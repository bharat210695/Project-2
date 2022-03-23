const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const ObjectId = mongoose.Schema.Types.ObjectId

let validateEmail = function(email) {
    let regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexForEmail.test(email)
};

let validateMobile = function(mobile) {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    return phoneRegExp.test(mobile)
};


const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        validate: [validateEmail, "Please enter a valid email address"],
        required: true,
        lowercase: true,
        trim: true
    },

    mobile: {
        type: String,
        unique: true,
        validate: [validateMobile, "Please enter a valid mobile number"],
        required: true,
        trim: true
    },

    collegeId: {
        type: ObjectId,
        ref: "College",
        required: true,
        trim: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamp: true })


module.exports = mongoose.model("Intern", internSchema)