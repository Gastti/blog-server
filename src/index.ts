import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import postRouter from './routes/post.route'
import dbInit from './database/mongo'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/posts', postRouter)

dbInit()
  .then(() => console.log(''))
  .catch(error => console.log(error))

app.listen(process.env.PORT, () => {
  console.log('[SERVER]: Ready')
})
