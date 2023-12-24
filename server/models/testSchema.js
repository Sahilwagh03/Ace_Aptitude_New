const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new Schema({
  tests: [
    {
      testName: {
        type: String,
      },
      score: {
        type: Number,
      },
      dateTaken: {
        type: Date,
      },
      durationMinutes: {
        type: Number,
      },
      category: {
        type: String,
      },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  coins: {
    type: Number,
    default: 0,
  },
});

const Test = mongoose.model('tests', testSchema);

module.exports = Test;