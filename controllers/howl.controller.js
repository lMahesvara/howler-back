import Howl from '../models/Howl.js'
import Hashtag from '../models/Hashtag.js'
import User from '../models/User.js'

export const addHowl = async (req, res) => {
  const { user, text, image, hashtags } = req.body
  console.log('addHowl', req.body)

  if (!user || !text) {
    return res.status(400).json({ message: 'Please provide all fields' })
  }
  try {
    const idsHashtags = []

    if (hashtags) {
      for (const hashtag of hashtags) {
        const newHashtag = await Hashtag.findOne({ name: hashtag })
        if (!newHashtag) {
          const newHashtag = new Hashtag({ name: hashtag })
          await newHashtag.save()
          idsHashtags.push(newHashtag.id)
        } else {
          idsHashtags.push(newHashtag.id)
        }
      }
    }

    const howl = new Howl({ user, text, image, hashtags: idsHashtags })
    await howl.save()

    const userUpdated = await User.findOneAndUpdate(
      { _id: user },
      { $push: { howls: howl.id } },
      { new: true }
      )

    res.status(201).json(howl)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getHowlById = async (req, res) => {
  const { idHowl } = req.params

  if (!idHowl) {
    return res.status(400).json({ message: 'Please provide an id' })
  }

  try {
    const howl = await Howl.findById(idHowl)
    res.json(howl)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getHowlsByUserId = async (req, res) => {
  const { idUser } = req.params

  if (!idUser) {
    return res.status(400).json({ message: 'Please provide an User id' })
  }

  try {
    const howls = await Howl.find({ user: idUser })
    res.json(howls)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getHowlsByHashtag = async (req, res) => {
  const { idHashtag } = req.params

  if (!idHashtag) {
    return res.status(400).json({ message: 'Please provide a hashtag' })
  }

  try {
    const howls = await Howl.find({ hashtags: idHashtag })
    res.json(howls)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getHowls = async (_, res) => {
  try {
    const howls = await Howl.find({})
    res.json(howls)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const likeHowl = async (req, res) => {
  const { idHowl, idUser } = req.params

  if (!idHowl || !idUser) {
    return res.status(400).json({ message: 'Please provide an id' })
  }
  let liked = false
  try {
    const howl = await Howl.findById(idHowl)
    if (howl.likes.includes(idUser)) {
      howl.likes = howl.likes.filter(id => id !== idUser)
      liked = false
    } else {
      howl.likes.push(idUser)
      liked = true
    }
    await howl.save()
    res.json({ liked, likes: howl.likes.length })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const replyHowl = async (req, res) => {
  const {idHowl} = req.params
  const { idUser, text, image, hashtags} = req.body

  if (!idHowl || !idUser || !text) {
    return res.status(400).json({ message: 'Please provide all fields' })
  }

  try {
    const howl = await Howl.findById(idHowl)
    const idsHashtags = []

    if (hashtags) {
      for (const hashtag of hashtags) {
        const newHashtag = await Hashtag.findOne({ name: hashtag })
        if (!newHashtag) {
          const newHashtag = new Hashtag({ name: hashtag })
          await newHashtag.save()
          idsHashtags.push(newHashtag.id)
        } else {
          idsHashtags.push(newHashtag.id)
        }
      }
    }
    
    const reply = new Howl({ user: idUser, text, image, type: 'reply', hashtags: idsHashtags })

    await reply.save()
    howl.replies.push(reply)

    await howl.save()
    res.status(201).json(reply)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const rehowl = async (res, req) => {
  const { idHowl } = req.params
  const { idUser } = req.body

  if (!idHowl || !idUser) {
    return res.status(400).json({ message: 'Please provide all fields' })
  }

  try {
    const howl = await Howl.findById(idHowl)
    howl.rehowls.push(idUser)

    // const rehowl = new Howl({ user: idUser, text: howl.text, image: howl.image, type: 'rehowl' })
    await rehowl.save()
    howl.rehowls.push(rehowl)
    await howl.save()

    const userUpdated = await User.findOneAndUpdate(
      { _id: idUser },
      { $push: { howls: howl.id } },
      { new: true }
      )

    res.status(201).json(rehowl)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}