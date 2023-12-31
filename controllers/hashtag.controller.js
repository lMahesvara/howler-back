import Hashtag from '../models/Hashtag.js'

export const getHashtags = async (req, res) => {
  const hashtagSearched = req.params

  if (
    !hashtagSearched.name ||
    typeof hashtagSearched.name !== 'string' ||
    hashtagSearched.name.trim() === ''
  ) {
    return res.status(400).json({ message: 'Hashtag not found' })
  }

  try {
    const hashtag = await Hashtag.find({
      name: { $regex: hashtagSearched.name, $options: 'i' },
    })
    res.status(200).json(hashtag)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const addHashtag = async (req, res) => {
  const hashtag = req.body

  if (!hashtag.name) {
    return res.status(400).json({ message: 'Please provide a Hashtag' })
  }

  const newHashtag = new Hashtag(hashtag)
  try {
    await newHashtag.save()
    res.status(201).json(newHashtag)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
