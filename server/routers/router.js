const express = require("express");
const passport = require('passport')
const {
  getAllQuestions,
  getAllCategories,
  getFilteredQuestions,
  filterQuestions,
  getFilteredData,
  getSearchTopic,
  postSignUp,
  postLogin,
} = require("../controllers/controller"); // Import both controller functions
const router = express.Router();

router.get('/Allcategory',getAllCategories)
router.get("/Allquestions", getAllQuestions);
router.get("/filterQuestions/:category/:level", getFilteredQuestions);
router.get("/Filterquestions", filterQuestions); // Add this route for filtering
router.get('/FilterData/:category?/:level?', getFilteredData);
router.get("/Search/:topic",getSearchTopic);
router.post('/signup', postSignUp);
router.post('/login', postLogin);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/SignUp' ,successRedirect:'http://localhost:3000' }), (req, res) => {
  res.end('logged in')
})
router.get('/login/success' , (req,res)=>{
  if(req.user){
    res.send(req.user)
  }
  else{
    res.send({message:'not'})
  }
})
module.exports = router;
