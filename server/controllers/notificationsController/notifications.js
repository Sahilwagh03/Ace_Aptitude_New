const { addNewNotification } = require('../../helpers/addNewNotification');
const Notifications = require('../../models/notificationSchema');

const getNotification = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userNotifications = await Notifications.find({ userId });
        const notificationData={
            _id:userNotifications[0]._id,
            notifications:userNotifications[0].notifications
        }
        res.status(200).send({success: true, data:notificationData});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const postNotification = async (req, res) => {
    try {
        const { userId } = req.params;
        const { title, description, icon, sentAt } = req.body;

        const notificationData = {
            title,
            description,
            icon,
            sentAt
        };

        const response = addNewNotification(userId ,notificationData)
        res.status(201).json({success:true,message:'notification added to db',response});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getNotification,
    postNotification
}