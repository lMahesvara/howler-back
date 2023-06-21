import Notification from '../models/Notification.js'

export const readNotification = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'Please provide an id' })
  }

  try {
    const notification = await Notification.findById(id)
    res.json(notification)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getNotifications = async (req, res) => {
  const { userTo } = req.params

  if (!userTo) {
    return res.status(400).json({ message: 'Please provide the user id' })
  }

  try {
    const notifications = await Notification.find({
      userTo: userTo,
    })
    res.json(notifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addNotification = async (req, res) => {
 
  const { userTo,userFrom, type, read, howl, title, body } = req.body

  if (!title || !userTo || !type || !userFrom || !howl) {
    return res.status(400).json({ message: 'Please provide all fields' })
  }
  try {
    const notification = new Notification({ userTo, userFrom, type, read, howl, title,body })
    await notification.save()
    res.json(notification)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

