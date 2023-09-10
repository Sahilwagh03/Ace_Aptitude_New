const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
  difficulty: { type: String, required: true },
  category: { type: String, required: true }
});

// Create the model from the schema
const Category = mongoose.model('categories', categorySchema);

module.exports = Category;