const Category = require("../../models/categorySchema");

const getFilter = async (req, res) => {
    const { difficulty, sortby, subtopic } = req.query;

    let filter = {};

    if (difficulty) {
        filter['difficulty'] = { $regex: difficulty };
    }

    if (subtopic) {
        // Split the subtopic string into an array of subtopics
        const subtopics = subtopic.split(',');

        // Use $in operator to match documents where the subtopic field contains any of the specified values
        filter['subtopic'] = { $in: subtopics };
    }

    try {
        let filteredData = await Category.find(filter);

        if (sortby && (sortby === 'A-Z' || sortby === 'Name')) {
            filteredData = filteredData.sort((a, b) => a.category.localeCompare(b.category));
        }

        res.send({ message: 'Filter complete', data:filteredData });
    } catch (error) {
        console.error("Error filtering data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { getFilter };
