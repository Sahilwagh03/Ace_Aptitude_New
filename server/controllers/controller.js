const mongoose = require("mongoose");
const Question = require("../models/questionSchema");

const getAllQuestions = async (req, res) => {
  try {
    const allData = await Question.find();
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

const getQuestionsLevel = async (req, res) => {
  try {
    const filteredData = await Question.find(
      {
        "$or":[
            {'difficulty':{$regex:req.params.level}},
        ]
    }
    );
    res.send(filteredData);
  } catch (error) {
    console.error("Error fetching all questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getAllQuestions,
  filterQuestions,
  getQuestionsLevel
};
