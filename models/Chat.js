import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  unread: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  ],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
})

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema)
