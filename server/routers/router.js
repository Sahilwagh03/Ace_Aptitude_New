const express = require("express");
const {
  getAllQuestions,
  getAllCategories,
  filterQuestions,
  getCategoryLevel,
  getQuestionCategory
} = require("../controllers/controller"); // Import both controller functions
const router = express.Router();

router.get('/Allcategory',getAllCategories)
router.get("/Allquestions", getAllQuestions);
router.get("/Filterquestions", filterQuestions); // Add this route for filtering
router.get('/Difficulty/:level' , getCategoryLevel);
router.get('/Category/:category' , getQuestionCategory);
module.exports = router;
