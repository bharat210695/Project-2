const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({

        name: {
            type: String,
            unique: [true, "enter unique college name abbreviation"],
            required: true,
            lowercase: true,
            trim: true
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        logoLink: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        isDeleted: {
            type: Boolean,
            default: false
        },
    },

    { timestamp: true })



module.exports = mongoose.model("College", collegeSchema)