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
    required: [true, 'Please provide a text for this howl.'],
    maxlength: [140, 'Howl cannot be more than 140 characters'],
  },
  image: String,
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
    enum: ['howl', 'reply', 'comment'],
    default: 'howl',
  },
  rehowls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})