const mongoose = require('mongoose')
const { Schema } = mongoose;

const questionModel = new Schema({
  questionText: { type: String, required: true },
  options: [
    { type: String, required: true },
    { type: String, required: true },
    { type: String, required: true },
    { type: String, required: true },
  ],
  correctOptionIndex: { type: Number, required: true },
});

// Create the model from the schema
const Question = mongoose.model('questions', questionModel);

module.exports = Question;