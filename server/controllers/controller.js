const mongoose = require("mongoose");
const Question = require("../models/questionSchema");
const Category = require("../models/categorySchema")

const getAllQuestions = async (req, res) => {
  try {
    const allData = await Question.find();
    res.send(allData);
  } catch (error) {
    console.error("Error fetching all questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allData = await Category.find();
    res.send(allData);
  } catch (error) {
    console.error("Error fetching all questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const filterQuestions = async (req, res) => {
  const filterText = req.query.filter;

  try {
    let query = {};

    if (filterText) {
      query = { questionText: { $regex: filterText, $options: "i" } };
    }

    const filteredQuestions = await Question.find(query);
    res.json(filteredQuestions);
  } catch (error) {
    console.error("Error fetching filtered questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoryLevel = async (req, res) => {
  try {
    const filteredData = await Category.find(
      {
        "$or": [
          { 'difficulty': { $regex: req.params.level } },
        ]
      }
    );
    res.send(filteredData);
  } catch (error) {
    console.error("Error fetching all questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getQuestionCategory = async (req, res) => {
  try {
    console.log(req.params.category)
    if (req.params.category === "All") {
      const filteredData = await Category.find();
      res.send(filteredData);
    }
    else {
      const filteredData = await Category.find(
        {
          "$or": [
            { 'category': { $regex: req.params.category } },
          ]
        }
      );
      res.send(filteredData);
    }
    
  } catch (error) {
    console.error("Error fetching all questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




module.exports = {
  getAllQuestions,
  getAllCategories,
  filterQuestions,
  getCategoryLevel,
  getQuestionCategory,
};
