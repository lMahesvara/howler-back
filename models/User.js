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
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dq6bsxacw/image/upload/v1688607947/7309681_yzfrpy.jpg',
    },
    banner: {
      type: String,
      default:
        'https://res.cloudinary.com/dq6bsxacw/image/upload/v1688594594/howler/wqhnd7pmxlxbzbizaskw.jpg',
    },
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
    token: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
