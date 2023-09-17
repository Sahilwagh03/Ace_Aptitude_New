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

router.get('/Allcategory', getAllCategories)
router.get("/Allquestions", getAllQuestions);
router.get("/filterQuestions/:category/:level", getFilteredQuestions);
router.get("/Filterquestions", filterQuestions); // Add this route for filtering
router.get('/FilterData/:category?/:level?', getFilteredData);
router.get("/Search/:topic", getSearchTopic);
router.post('/signup', postSignUp);
router.post('/login', postLogin);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'https://ace-aptitude-psi.vercel.app/SignUp', successRedirect: 'https://ace-aptitude-psi.vercel.app' }), (req, res) => {
  // If authentication is successful, req.user will contain the user's data
  if (req.isAuthenticated()) {
    res.json({
      message: 'logged in!',
      user: req.user // This will contain the user's data
    });
  } else {
    // Handle authentication failure
    res.json({ message: 'Authentication failed' });
  }

})
router.get('/login/success', (req, res) => {
  try {
    console.log("Session:", req.session);
    console.log("User:", req.user);
    if (req.user) {
      res.send(req.user)
    }
    else {
      res.send("not generated")
    }
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
