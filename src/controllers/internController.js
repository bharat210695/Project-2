const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

// Create a document for an intern.
const createIntern = async function(req, res) {

    try {
        let internData = req.body
        let id = req.body.collegeId

        if (!id) return res.status(400).send({ status: false, msg: "Please provide collegeId" })

        let college = await collegeModel.findById(id)

        if (!college) return res.send(404).send({ status: false, msg: "Please provide valid collegeId" })

        let intern = await internModel.create(internData)

        res.status(201).send({ status: true, data: intern, msg: "Intern data created successfully " })


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
        let data = JSON.parse(JSON.stringify(dataOne))
        const C_id = dataOne._id

        if (!dataOne) {
            return res.status(403).send({ status: false, message: "The value is Invalid" });
        }

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