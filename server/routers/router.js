const express = require("express");
const {
  getAllQuestions,
  getAllCategories,
  getFilteredQuestions,
  filterQuestions,
  getFilteredData,
  getSearchTopic,
  postSignUp,
  postLogin
} = require("../controllers/controller"); // Import both controller functions
const router = express.Router();

router.get('/Allcategory',getAllCategories)
router.get("/Allquestions", getAllQuestions);
router.get("/filterQuestions/:category/:level", getFilteredQuestions);
router.get("/Filterquestions", filterQuestions); // Add this route for filtering
router.get('/FilterData/:category?/:level?', getFilteredData);
router.get("/Search/:topic",getSearchTopic);
router.post('/signup', postSignUp);
router.post('/login', postLogin)
module.exports = router;
