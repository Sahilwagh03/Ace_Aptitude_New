const User = require("../../models/UserSchema");
const { uploadFile } = require('../../helpers/uploadImageCloudnary');

const uploadProfileImage = async (req, res) => {
    try {

        const { url } = req.body;
        const userId = req.params.id; // Update this based on how the ID is received

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ success: false, msg: 'User not found' });
        }

        // Update profileImage field
        user.profileImage = url;

        // Save the updated user
        const updatedUser = await user.save()
        const profileImage = updatedUser.profileImage
        res.send({ success: true, msg: 'File Uploaded Successfully!', data:profileImage });

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, msg: error.message });
    }
}

module.exports = {
    uploadProfileImage
};
