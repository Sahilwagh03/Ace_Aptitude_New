const User = require('../../models/UserSchema')

const getLeaderboard = async (req, res) => {
    try {
        const usersWithCoins = await User.find({}, { _id: 0, password: 0 })
            .populate('tests').exec()

        const leaderboard = usersWithCoins.map((user) => {
            const totalCoins = user.tests.reduce((acc, test) => acc + test.coins, 0);
            return {
                name: user.Name,
                profileImage:user.profileImage,
                totalcoins:totalCoins,
            };
        });

        leaderboard.sort((a, b) => b.totalCoins - a.totalCoins);

        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getLeaderboard }