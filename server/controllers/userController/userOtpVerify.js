const { addNewNotification } = require('../../helpers/addNewNotification');
const User = require('../../models/UserSchema'); // Update the path to your User schema/model
const { postNotification } = require('../notificationsController/notifications');

const verifyOtp = async (req, res) => {
  try {
    const { email, otp, purpose } = req.body;
    const user = await User.findOne({ email });
    console.log(purpose)
    if (!user) {
      console.log('User not found');
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

      if (purpose !== 'passwordReset') {
        const notificationData = {
          title: 'Verification Successful',
          description: "Your account has been successfully verified.",
          icon: "https://res.cloudinary.com/dmrjruik5/image/upload/v1703336250/fpdcuvedws7f4mtf4yyr.jpg",
          sentAt: new Date()
        }
        addNewNotification(user._id, notificationData)
      }

      // const userWithoutPassword = {
      //   Name: user.Name,
      //   _id: user._id,
      //   email: user.email,
      //   profileImage: user.profileImage,
      //   isVerified: user.isVerified
      //   // Add any other user information fields you want to include
      // };

      return res.status(200).json({ success: true, message: 'OTP verified' });
    }

    if (user.otpExpiresAt < Date.now()) {
      console.log('OTP expired');
      return res.status(400).json({ success: false, message: 'OTP expired, please request a new one' });
    }

    console.log('Invalid OTP');
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  verifyOtp,
};
