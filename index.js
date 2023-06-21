import express from 'express'
import cors from 'cors'
import dbConnect from './utils/dbConnect.js'
import { routes } from './routes/routes.js'
import swagger from './utils/swagger.json' assert { type: 'json' }
import swaggerUi from 'swagger-ui-express'

const app = express()
await dbConnect()

app.use(cors())
app.use(express.json())

app.use(routes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger))

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
