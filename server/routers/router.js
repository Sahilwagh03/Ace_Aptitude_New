const express = require("express");
const passport = require('passport')
const {
  getAllusers,
  getAllQuestions,
  getAllCategories,
  getFilteredQuestions,
  filterQuestions,
  getFilteredData,
  getSearchTopic,
  postSignUp,
  postLogin,
  getRandomQuestions,
  postTestData,
  getAlltestsData,
  getUserTestData,
  getUserCoins,
  updateUserDetails

} = require("../controllers/controller"); // Import both controller functions
const router = express.Router();

router.get('/Allusers', getAllusers)
router.get('/Allcategory', getAllCategories)
router.get("/Allquestions", getAllQuestions);
router.get("/filterQuestions/:category/:level", getFilteredQuestions);
router.get("/Filterquestions", filterQuestions); // Add this route for filtering
router.get('/FilterData/:category?/:level?', getFilteredData);
router.get("/Search/:topic", getSearchTopic);
router.post('/signup', postSignUp);
router.post('/login', postLogin);
router.put('/editProfile',updateUserDetails)
router.get('/getRandomQuestions/:numberOfQuestions/:category',getRandomQuestions);
router.post('/tests',postTestData);
router.get('/Alltests',getAlltestsData);
router.get('/user/tests/:userId',getUserTestData);
router.get('/user/coins/:userId', getUserCoins)

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'https://ace-aptitude-psi.vercel.app/SignUp', successRedirect: 'https://ace-aptitude-psi.vercel.app' }), (req, res) => {
  res.send('logged in!')
})
router.get('/login/success', (req, res) => {
  try {
    console.log("Session:", req.session);
    console.log("User:", req.user);
    if (req.user) {
      res.send(req.user)
    }
    else{
      res.send("not generated")
    } 
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
