import Chat from '../models/Chat.js'

export const getChat = async (req, res) => {
  const { firstId, secondId } = req.params
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    })

    if (!chat) {
      const newChat = new Chat({
        members: [firstId, secondId],
        unread: [
          { member: firstId, amount: 0 },
          { member: secondId, amount: 0 },
        ],
      })
      await newChat.save()
      res.status(201).json(newChat)
    }
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json({ message: `Failed to get chat ${error.message}` })
  }
}

export const getChats = async (req, res) => {
  const { idUser } = req.params
  try {
    const chats = await Chat.find({ members: { $all: [idUser] } })
    res.status(200).json(chats)
  } catch (error) {
    res.status(500).json({ message: `Failed to get chat ${error.message}` })
  }
}

export const read = async (req, res) => {
  const { idChat, idUser } = req.params

  if (!idChat && !idUser) {
    return res.status(400).json({ message: 'idChat & idUser not founded' })
  }

  try {
    const chat = await Chat.findById(idChat)

    chat.unread = chat.unread.map(member =>
      member.member.toString() === idUser ? { ...member, amount: 0 } : member
    )

    await chat.save()
    res.status(200).json(chat)
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to get unread messages ${error.message}` })
  }
}
