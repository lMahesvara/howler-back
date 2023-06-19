import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this user.'],
      maxlength: [20, 'Name cannot be more than 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email for this user.'],
      maxlength: [30, 'Email cannot be more than 30 characters'],
    },
    username: {
      type: String,
      required: [true, 'Please provide a username for this user.'],
      maxlength: [20, 'Username cannot be more than 20 characters'],
    },
    image: String,
    banner: String,
    password: String,
    howls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Howl',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
