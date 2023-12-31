const Notifications = require("../models/notificationSchema");

const addNewNotification = async (userId,notificationData) => {


    // Find the notification with the given userId
    let notification = await Notifications.findOne({ userId });
    // If the notification doesn't exist, create a new one
    if (!notification) {
        notification = new Notifications({
            userId,
            notifications: [notificationData]
        });
    } else {
        // Push the new notification data into the notifications array
        notification.notifications.push(notificationData);
    }
    const savedNotification = await notification.save();
    if (savedNotification) {
        return true
    }
    return false
}

module.exports = {
    addNewNotification
}