const Category = require("../../models/categorySchema");

const getFilter = async (req, res) => {
    const { difficulty, sortby, subtopic } = req.query;

    let filter = {};

    if (difficulty) {
        // Making difficulty case-insensitive
        filter['difficulty'] = { $regex: difficulty, $options: 'i' };
    }

    if (subtopic) {
        // Convert to lowercase for consistent matching and apply case-insensitive regex
        filter['subtopic'] = { $regex: subtopic.toLowerCase(), $options: 'i' };
    }

    try {
        let filteredData = await Category.find(filter);

        if (sortby && (sortby === 'A-Z' || sortby === 'Name')) {
            filteredData = filteredData.sort((a, b) => a.category.localeCompare(b.category));
        }

        res.send({ message: 'Filter complete', data: filteredData });
    } catch (error) {
        console.error("Error filtering data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { getFilter };
