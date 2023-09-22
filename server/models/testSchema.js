const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new Schema({
  tests: [
    {
      testName: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      dateTaken: {
        type: Date,
        required: true,
      },
      durationMinutes: {
        type: Number,
      },
      category: {
        type: String,
      },
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
    default: 0,
  },
});

const Test = mongoose.model('tests', testSchema);

module.exports = Test;