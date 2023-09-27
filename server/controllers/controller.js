const mongoose = require("mongoose");
const Question = require("../models/questionSchema");
const Category = require("../models/categorySchema")
const Test = require("../models/testSchema")
const User = require('../models/UserSchema')
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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


const getSearchTopic = async (req, res) => {
  try {
    const topic = req.params.topic;
    const searchResults = await Category.find(
      {
        "$or": [
          { 'category': { $regex: topic } }
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

const postSignUp = async (req, res) => {
  try {
    const { Name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({ Name, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', success: true });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
}

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Here, we create a user object without the password field
    const userWithoutPassword = {
      Name: user.Name,
      _id: user._id,
      email: user.email,
      // Add any other user information fields you want to include
    };

    // You can generate a JWT token here and send it back to the client for authentication

    res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getRandomQuestions = async(req,res)=>{
  try {
    const { numberOfQuestions, category } = req.params;
    
    // Calculate the number of easy, medium, and hard questions based on percentages
    const totalQuestions = parseInt(numberOfQuestions, 10);
    const easyCount = Math.ceil(totalQuestions * 0.3);
    const mediumCount = Math.ceil(totalQuestions * 0.5);
    const hardCount = Math.floor(totalQuestions * 0.2);

    // Query the database to fetch random questions for each difficulty level and category
    const easyQuestions = await Question.aggregate([
      { $match: { difficulty: 'easy', category } },
      { $sample: { size: easyCount } },
    ]);

    const mediumQuestions = await Question.aggregate([
      { $match: { difficulty: 'medium', category } },
      { $sample: { size: mediumCount } },
    ]);

    const hardQuestions = await Question.aggregate([
      { $match: { difficulty: 'hard', category } },
      { $sample: { size: hardCount } },
    ]);

    // Combine the questions from different difficulty levels
    const allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

    res.send(allQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching questions' });
  }
}

const postTestData = async (req, res) => {
  try {
    const { userId, test } = req.body;
    console.log(req.body.tests)

    // Find the user's tests by userId
    const existingUserTests = await Test.findOne({ userId });

    if (!existingUserTests) {
      // If no tests exist for the user, create a new user and test
      const newUserTests = new Test(req.body);
      await newUserTests.save();
      res.send({message:"Saved successfully"})
    } else {
      // If tests exist for the user, append the new test to the existing tests array
      existingUserTests.tests.push(...req.body.tests);
      existingUserTests.coins += req.body.coins;
      await existingUserTests.save();
      res.send({message:"Saved successfully"})
    }
  } catch (error) {
    console.error('Error creating/updating test:', error);
    res.status(500).json({ message: 'Failed to create/update test' });
  }
};

const getAlltestsData = async (req, res) => {
  try {

    const userTests = await Test.find();
    // Respond with the user's test data
    res.status(200).json(userTests);
  } catch (error) {
    console.error('Error fetching user test data:', error);
    res.status(500).json({ message: 'Failed to fetch user test data' });
  }
}

const getAllusers = async(req,res)=>{
  try {
    const UserData = await User.find();
    const users = UserData.map(user => ({
      _id: user._id,
      name: user.Name, // Assuming 'Name' is the field in your user schema
    }));
    // Respond with the user's test data
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching user test data:', error);
    res.status(500).json({ message: 'Failed to fetch user test data' });
  }
}

const getUserTestData = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user's test data by userId
    const userTests = await Test.findOne({ userId });

    if (!userTests) {
      // If no tests exist for the user, respond with a 404 Not Found status
      return res.status(404).json({ message: 'No tests found for the user' });
    }

    // Respond with the user's test data
    res.status(200).json(userTests);
  } catch (error) {
    console.error('Error fetching user test data:', error);
    res.status(500).json({ message: 'Failed to fetch user test data' });
  }
}

const getUserCoins = async(req,res)=>{
  try {
    const userId = req.params.userId;

    // Find the user's test data by userId
    const userTests = await Test.findOne({ userId });

    if (!userTests) {
      // If no tests exist for the user, respond with a 404 Not Found status
      return res.status(404).json({ message: 'No tests found for the user' });
    }

    // Respond with the user's test data
    res.status(200).json(userTests.coins);
  } catch (error) {
    console.error('Error fetching user test data:', error);
    res.status(500).json({ message: 'Failed to fetch user test data' });
  }
}

passport.use(new GoogleStrategy({
  clientID: '919740930128-phrohd0e30q770ueufj7nsg3hk3a1mff.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "https://ace-aptitude.onrender.com/api/auth/google/callback",
  scope: ['profile', 'email']
},
  async function (accessToken, refreshToken, profile, done) {
    // Register user here.
    console.log(profile);
    try {
      // Check if the user exists in your database
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // User already exists, return the user
        return done(null, profile);
      }

      // User doesn't exist, create a new one
      const newUser = new User({
        googleId: profile.id,
        email: profile._json.email,
      });

      await newUser.save();
      return done(null, profile);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  // Serialize the user with only the desired fields
  const serializedUser = {
    googleId: user.id,
    email: user._json.email,
    picture: user._json.picture,
    name: user._json.name,
  };
  done(null, serializedUser);
});

passport.deserializeUser((user, done) => {
  done(null, user);
})

module.exports = {
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
  getUserCoins
};
