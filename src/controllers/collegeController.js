const collegeModel = require('../models/collegeModel')

// Create a college-document
const createCollege = async function(req, res) {

    try {
        let collegeData = req.body

        if (!collegeData) return res.status(400).send({ status: false, message: "data is required" })

        let college = await collegeModel.create(collegeData)

        res.status(201).send({ status: true, data: college, message: "data created successfully" })

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }

}


module.exports.createCollege = createCollege