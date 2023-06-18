import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: [true, 'Please provide a text for this message.'],
    maxlength: [140, 'Message cannot be more than 140 characters'],
  },
  image: String,
})

export default mongoose.models.Message ||
  mongoose.model('Message', MessageSchema)
