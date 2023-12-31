const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  notifications: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    icon:{type:String , required:true}
  }]
});

const Notifications = mongoose.model('notifications', notificationSchema);

module.exports = Notifications;
