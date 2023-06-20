import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  unread: {
    _id: false,
    type: [
      {
        member: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        amount: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null,
  },
})

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema)
