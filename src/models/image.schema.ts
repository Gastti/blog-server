import { Schema, model } from 'mongoose'
import { Image } from '../types'

const ImageSchema: Schema = new Schema({
  url: { type: String },
  key: { type: String },
  expirationDate: { type: String }
})

export const ImageModel = model<Image>('Image', ImageSchema)
