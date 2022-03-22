const express = require('express');
const router = express.Router();

const CollegeController = require('../controllers/collegeController')
const InternController = require('../controllers/internController')

// test-api
router.get('/test', function(req, res) {
    res.status(200).send({ status: true, message: "test api working fine" })
})

//1. Create a college-document
router.post("/colleges", CollegeController.createCollege)

//2. Create a document for an intern
router.post("/interns", InternController.createIntern)

//3. Returns the college details for the requested college
router.get("/collegeDetails", InternController.collegeDetails)


module.exports = router;