import { Schema, model } from 'mongoose'
import { IUser } from '../types'

const UserSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    contactUrl: { type: String, default: '' },
    role: { type: String, required: true },
    biography: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

export const UserModel = model<IUser>('User', UserSchema)
