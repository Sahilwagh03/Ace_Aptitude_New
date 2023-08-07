const mongoose = require('mongoose')
const Question = require('../models/questionSchema')

const getAllQuestions = async(req,res)=>{
    const AllData = await Question.find()
    res.send(AllData)
}

module.exports = getAllQuestions