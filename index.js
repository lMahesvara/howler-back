import express from 'express'
import cors from 'cors'
import dbConnect from './utils/dbConnect.js'
import { routes } from './routes/routes.js'

const app = express()
await dbConnect()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
