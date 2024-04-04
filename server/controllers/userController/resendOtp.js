const User = require('../../models/UserSchema'); // Update the path to your User schema/model
const { sendVerificationEmail } = require('../../helpers/sendVerificationEmail'); // Update the path accordingly

const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is already verified
        // if (user.isVerified) {
        //     return res.status(400).json({ message: 'User is already verified' });
        // }


        // Function to generate a random 4-digit OTP
        const generateOTP = () => {
            return Math.floor(1000 + Math.random() * 9000).toString();
        };
        // Regenerate OTP and update expiration time
        const otp = generateOTP();
        user.verificationOTP = otp;
        user.otpExpiresAt = new Date(Date.now() + 600000); // Set OTP expiration time (e.g., 10 minutes)

        // Save the updated OTP details to the database
        await user.save();

        const purpose = 'Resend otp'
        // Send verification email with new OTP
        await sendVerificationEmail(user.Name, user.email, otp,purpose);

        return res.status(200).json({ message: 'OTP sent' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    resendOTP,
};
