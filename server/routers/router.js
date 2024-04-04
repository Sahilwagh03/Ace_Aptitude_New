const express = require("express");
const passport = require('passport')
const {
  getAllusers,
  getAllQuestions,
  getAllCategories,
  getPracticeQuestions,
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
  updateUserDetails,
} = require("../controllers/controller"); // Import both controller functions
const { getLeaderboard } = require('../controllers/leaderboard_controller/leaderboard')
const { uploadProfileImage } = require('../controllers/userController/userProfileUpload')
const { getUserDetails } = require('../controllers/userController/userDetails')
const multer = require('multer');
const { deleteProfileCloudnary } = require("../controllers/userController/userDeleteProfile");
const { sendVerificationEmail } = require('../helpers/sendVerificationEmail');
const { verifyOtp } = require("../controllers/userController/userOtpVerify");
const { resendOTP } = require("../controllers/userController/resendOtp");
const { getNotification, postNotification } = require("../controllers/notificationsController/notifications");
const { getFilter } = require("../controllers/filtercontroller/filter");
const { forgetPassword, resetPassword } = require("../controllers/userController/forgetPassword");
const { loginWithGoogle } = require("../controllers/userController/loginWithGoogle");
// var uploader = multer({
//   storage: multer.diskStorage({}),
//   limits: { fileSize: 500000 }
// });
const router = express.Router();

router.get('/userDetails', getUserDetails)
router.get('/Allusers', getAllusers)
router.get('/Allcategory', getAllCategories)
router.get("/Allquestions", getAllQuestions);
router.get("/practiceQuestions/:category/:level", getPracticeQuestions);
router.get("/Filterquestions", filterQuestions); // Add this route for filtering
router.get('/FilterData/:category?/:level?', getFilteredData);
router.get('/filter',getFilter)
router.get("/search/:topic", getSearchTopic);
router.post('/signup', postSignUp);
router.post('/login', postLogin);
router.put('/editProfile', updateUserDetails)
router.get('/getRandomQuestions/:numberOfQuestions/:category', getRandomQuestions);
router.post('/tests', postTestData);
router.get('/Alltests', getAlltestsData);
router.get('/user/tests/:userId', getUserTestData);
router.get('/user/coins/:userId', getUserCoins)
router.get('/leaderboard', getLeaderboard)
router.post('/upload-profile-image/:id', uploadProfileImage)
router.delete('/delete-profile-cloudnary/:id', deleteProfileCloudnary)
router.post('/verify-otp',verifyOtp)
router.post('/resend-otp', resendOTP);
router.get('/notifications/:userId',getNotification)
router.post('/notifications/:userId',postNotification)
router.post('/forgetpassword',forgetPassword)

// Route for resetting the password
router.put('/reset-password', resetPassword);


//Google Login Routes
router.post('/googlecallback',loginWithGoogle)

module.exports = router;
