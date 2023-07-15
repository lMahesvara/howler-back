import mongoose from 'mongoose'

const HowlSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    maxlength: [255, 'Howl cannot be more than 140 characters'],
  },
  image: {
    type: String,
    default: '',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Howl',
    },
  ],
  hashtags: [
    {
      type: String,
    },
  ],
  type: {
    type: String,
    enum: ['howl', 'reply'],
    default: 'howl',
  },
  rehowls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

export default mongoose.models.Howl || mongoose.model('Howl', HowlSchema)
