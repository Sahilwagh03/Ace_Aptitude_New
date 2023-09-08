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

const getFilteredQuestions = async (req, res) => {
  try {
    const { category, level } = req.params;

    const filteredData = await Question.find({
      category: category,
      difficulty: level
    });

    res.send(filteredData);
  } catch (error) {
    console.error("Error fetching filtered questions:", error);
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


const getFilteredData = async (req, res) => {
  try {
    let filter = {};

    if (req.params.category && req.params.category !== "All") {
      filter['category'] = { $regex: req.params.category };
    }

    if (req.params.level && req.params.level !== "All") {
      filter['difficulty'] = { $regex: req.params.level };
    }

    // if (req.params.subtopics) {
    //   const subtopics = req.params.subtopics.split(',');
    //   filter['$and'] = subtopics.map((subtopic) => ({
    //     subtopic: subtopic,
    //   }));
    // }
    
    const filteredData = await Category.find(filter);
    res.send(filteredData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getSearchTopic = async (req,res) => {
  try {
    const topic = req.params.topic; 
    const searchResults = await Category.find(
      {
          "$or":[
              {'category':{$regex:topic}}
          ]
      }
  )
  res.send(searchResults)
}
    
   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllQuestions,
  getAllCategories,
  getFilteredQuestions,
  filterQuestions,
  getFilteredData,
  getSearchTopic
};
