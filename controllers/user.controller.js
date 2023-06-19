import User from '../models/User.js'

export const getUser = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'Please provide an id' })
  }

  try {
    const user = await User.findById(id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUsersByUsername = async (req, res) => {
  const { username } = req.params

  if (!username) {
    return res.status(400).json({ message: 'Please provide a username' })
  }

  try {
    const users = await User.find({
      username: { $regex: username, $options: 'i' },
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addUser = async (req, res) => {
  const { name, email, password, image, username, banner } = req.body

  if (!name || !email || !password || !username) {
    return res.status(400).json({ message: 'Please provide all fields' })
  }
  try {
    const user = new User({ name, email, password, image, username, banner })
    await user.save()
    res.json({ message: 'User saved' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'Please provide an id' })
  }
  const { name, image, banner } = req.body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, image, banner },
      { new: true }
    )
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const resetPassword = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'Please provide an id' })
  }
  const { password } = req.body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password },
      { new: true }
    )
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
