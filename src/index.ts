import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.route'
import userRouter from './routes/user.route'
import postRouter from './routes/post.route'
import commentRouter from './routes/comment.routes'
import filesRouter from './routes/files.routes'
import dbInit from './database/mongo'
import fileUpload from 'express-fileupload'

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './files'
}))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/files', filesRouter)

dbInit()
  .then(() => console.log(''))
  .catch(error => console.log(error))

app.listen(process.env.PORT, () => {
  console.log('[SERVER]: Ready')
})
