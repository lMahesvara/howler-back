import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
  userTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: ['like', 'rehowl', 'follow', 'reply'],
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // If type is follow, then howl is null
  howl: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Howl',
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
})

export default mongoose.models.Notification ||
  mongoose.model('Notification', NotificationSchema)
