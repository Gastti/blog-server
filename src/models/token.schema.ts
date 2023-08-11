import { Schema, model } from 'mongoose'
import { IToken } from '../types'

const TokenSchema: Schema = new Schema(
  {
    token: { type: String }
  },
  {
    timestamps: true
  }
)

export const TokenModel = model<IToken>('Token', TokenSchema)
