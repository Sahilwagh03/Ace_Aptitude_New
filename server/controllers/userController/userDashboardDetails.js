const Test = require("../../models/testSchema");

const getUserDashboardDetails = async (req, res) => {
    try {
        const userId = req.query.id;

        // Fetch user's tests from the database
        const userTests = await Test.find({ userId }); // Fetch all tests associated with the userId

        if (!userTests || userTests.length === 0) {
            return res.status(404).send({ message: "No tests found for the given user ID" });
        }

        // Access the inner array of tests
        const testsData = userTests[0]?.tests || [];

        const calculateCategoryScoreAverages = (tests) => {
            const categoryScores = {};

            tests.forEach((test) => {
                const category = test.category;
                if (!categoryScores[category]) {
                    categoryScores[category] = { totalScore: 0, testCount: 0 };
                }
                categoryScores[category].totalScore += test.score;
                categoryScores[category].testCount += 1;
            });

            const categoryAverages = Object.keys(categoryScores).map((category) => {
                const firstWord = category.split(' ')[0]; // Split by space and take the first part
                return {
                    value: Math.round(categoryScores[category].totalScore / categoryScores[category].testCount),
                    label: firstWord.charAt(0).toUpperCase() + firstWord.slice(1), // Capitalize the first word
                };
            });

            return categoryAverages;
        };

        const calculateCategoryTestCounts = (tests) => {
            const categoryCounts = {};

            tests.forEach((test) => {
                const category = test.category;
                if (!categoryCounts[category]) {
                    categoryCounts[category] = 0;
                }
                categoryCounts[category] += 1;
            });

            const categoryTestCounts = Object.keys(categoryCounts).map((category, index) => ({
                value: categoryCounts[category],
                label: category,
            }));

            return categoryTestCounts;
        };

        // Compute the dashboard data with the corrected array
        const categoryScoreAverages = calculateCategoryScoreAverages(testsData);
        const categoryTestCounts = calculateCategoryTestCounts(testsData);

        res.send({
            message: "Dashboard data received successfully!",
            categoryScoreAverages,
            categoryTestCounts,
        });
    } catch (error) {
        res.status(500).send({ message: "Error retrieving dashboard data", error: error.message });
    }
};

module.exports = { getUserDashboardDetails };
