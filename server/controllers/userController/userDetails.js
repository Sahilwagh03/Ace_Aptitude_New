const User = require("../../models/UserSchema");

const getUserDetails = async (req, res) => {
    try {
        const userId = req.query.id;
        console.log(userId)
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send({ success: false, msg: 'User not found' });
        }

        res.send({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
}

module.exports = {
    getUserDetails
}