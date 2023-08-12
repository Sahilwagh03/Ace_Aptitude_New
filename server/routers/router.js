const express = require("express");
const {
  getAllQuestions,
  filterQuestions,
  getQuestionsLevel
} = require("../controllers/controller"); // Import both controller functions
const router = express.Router();

router.get("/Allquestions", getAllQuestions);
router.get("/Filterquestions", filterQuestions); // Add this route for filtering
router.get('/Difficulty/:level' , getQuestionsLevel)
module.exports = router;
