const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const ObjectId = require('mongoose').Types.ObjectId

// Create a document for an intern.
const createIntern = async function(req, res) {

    try {
        let data = req.body

        let collegeId = req.body.collegeId

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: 'The request is not valid as the data are required.' })

        let collegeDetail = await collegeModel.findById(collegeId)

        if (!collegeDetail) return res.status(404).send({ status: false, message: 'The request is not valid as no intern is present with  given collage id' })

        let createNewIntern = await internModel.create(data)

        res.status(201).send({ status: true, data: createNewIntern })

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}


// Returns the college details for the requested college
const collegeDetails = async function(req, res) {

    try {
        let coll_name = req.query.collegeName
        if (!coll_name) {
            return res.status(400).send({ status: false, msg: "college name must be present" })
        }
        let dataOne = await collegeModel.findOne({ name: coll_name })
        if (!dataOne) {
            return res.status(403).send({ status: false, message: "collage is not present" });
        }
        let data = JSON.parse(JSON.stringify(dataOne))
        const C_id = dataOne._id
        let interns = await internModel.find({ collegeId: C_id }).select({ _id: true, name: true, email: true, mobile: true })
        data = { name: dataOne.name, fullName: dataOne.fullName, logoLink: dataOne.logoLink }
        data.interest = [...interns]
        res.status(200).send({ status: true, data: data });

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error.message })
    }
}

module.exports.createIntern = createIntern
module.exports.collegeDetails = collegeDetails