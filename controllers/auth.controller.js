import bcrypt from 'bcrypt'

import User from '../models/User.js'

export const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide all fields' })
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    return res.json({ message: 'Logged in successfully', user })
  } catch (error) {
    console.error('Error en el inicio de sesión:', error)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
}
