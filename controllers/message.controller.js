import Chat from '../models/Chat.js'
import Message from '../models/Message.js'

export const getMessages = async (req, res) => {
  const { idChat } = req.params

  if (!idChat) {
    return res.status(400).json({ message: 'Please provide an id' })
  }

  try {
    const chat = await Chat.findById(idChat)
    if (!chat) {
      return res.status(400).json({ message: 'Chat not found' })
    }

    const messages = await Message.find({ chat: idChat })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addMessage = async (req, res) => {
  const { idChat } = req.params
  const { sender, text } = req.body

  if (!idChat || !sender || !text) {
    return res.status(400).json({ message: 'Please provide all fields' })
  }

  try {
    const chat = await Chat.findById(idChat)
    if (!chat) {
      return res.status(400).json({ message: 'Chat not found' })
    }

    const newMessage = new Message({ chat: idChat, sender, text })
    await newMessage.save()

    chat.lastMessage = newMessage
    chat.unread = chat.unread.map(member =>
      sender === member.member.toString()
        ? { ...member, amount: 0 }
        : { ...member, amount: member.amount + 1 }
    )

    //console.log(chat)

    await chat.save()
    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
