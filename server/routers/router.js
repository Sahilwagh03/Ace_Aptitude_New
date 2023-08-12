const express = require("express");
const {
  getAllQuestions,
  filterQuestions,
  getQuestionsLevel,
  getQuestionCategory
} = require("../controllers/controller"); // Import both controller functions
const router = express.Router();

router.get("/Allquestions", getAllQuestions);
router.get("/Filterquestions", filterQuestions); // Add this route for filtering
router.get('/Difficulty/:level' , getQuestionsLevel);
router.get('/Category/:category' , getQuestionCategory);
module.exports = router;
