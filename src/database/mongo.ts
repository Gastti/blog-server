import { connect } from 'mongoose'

const DB_URI: string = process.env.MONGO_DB_URI ?? ''

const dbInit = async (): Promise<void> => {
  await connect(DB_URI)
    .then(() => console.log('[DATABASE]: Ready'))
    .catch(error => console.log('[DATABASE]: Error:', error))
}

export default dbInit
