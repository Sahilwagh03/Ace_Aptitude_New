const User = require('../../models/UserSchema'); // Update the path to your User schema/model

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.verificationOTP === otp && user.otpExpiresAt > Date.now()) {
      // Mark user as verified
      user.isVerified = true;

      // Clear the OTP and expiration after successful verification
      user.verificationOTP = null;
      user.otpExpiresAt = null;

      // Save the updated user in the database
      await user.save();

      return res.status(200).json({ success: true, message: 'OTP verified successfully' });
    }

    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: 'OTP expired, please request a new one' });
    }

    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  verifyOtp,
};
