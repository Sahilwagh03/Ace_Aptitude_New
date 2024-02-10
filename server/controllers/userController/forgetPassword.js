const { sendVerificationEmail } = require("../../helpers/sendVerificationEmail");
const User = require("../../models/UserSchema");
const bcrypt = require('bcrypt');
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.query;

        // Check if the email is provided
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find the user by email
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        // Function to generate a random 4-digit OTP
        const generateOTP = () => {
            return Math.floor(1000 + Math.random() * 9000).toString();
        };

        // Generate OTP
        const otp = generateOTP();

        // Update the user's OTP and expiry time
        existingUser.verificationOTP = otp;
        existingUser.otpExpiresAt = new Date(Date.now() + 600000);
        await existingUser.save();

        // Send verification email
        await sendVerificationEmail(existingUser.Name, existingUser.email, otp , purpose='passwordReset');

        return res.status(200).json({ message: 'OTP sent successfully' , success:true});
    } catch (error) {
        console.error('Error in forgetPassword:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Update user's password
        user.password = hashedPassword;
        // Clear OTP and expiry (if you have this logic)
        user.verificationOTP = null;
        user.otpExpiresAt = null;
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully',user });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { forgetPassword ,resetPassword};
