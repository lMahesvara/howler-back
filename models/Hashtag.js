import mongoose from 'mongoose'

const HashtagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this hashtag.'],
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
})

export default mongoose.models.Hashtag ||
  mongoose.model('Hashtag', HashtagSchema)
