const express = require('express')
const getAllQuestions = require('../controllers/controller')
const router = express.Router()

router.get('/Allquestions' , getAllQuestions)



module.exports = router