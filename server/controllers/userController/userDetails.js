const User = require("../../models/UserSchema");
const Test = require("../../models//testSchema");

const getUserDetails = async (req, res) => {
    try {
        const userId = req.query.id;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).send({ success: false, msg: 'User not found' });
        }
        
        // Fetch test details
        const testDocument = await Test.findOne({ userId });
        const { tests, coins } = testDocument;
        const numberOfTests = tests.length;
        
        const userWithoutPassword = {
            Name: user.Name,
            _id: user._id,
            email: user.email,
            profileImage: user.profileImage,
            isVerified: user.isVerified,
            numofTests:numberOfTests, // Add the number of tests
            coins: coins // Add the coins from the user schema
        };
        
        res.send({ success: true, data: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
}

module.exports = {
    getUserDetails
}
