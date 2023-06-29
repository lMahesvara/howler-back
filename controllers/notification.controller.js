import Notification from '../models/Notification.js'

export const readNotification = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'Please provide an id' })
  }

  try {
    const notification = await Notification.findById(id)

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    notification.read = true
    await notification.save()

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
  const { userTo, userFrom, type, howl, title, body } = req.body

  if (!userTo || !type || !userFrom) {
    return res.status(400).json({ message: 'Please provide all fields' })
  }
  try {
    const notification = new Notification({
      userTo,
      userFrom,
      type,
      howl,
      title,
      body,
    })
    await notification.save()
    res.status(201).json(notification)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
