import { Schema, model } from 'mongoose'
import { IUser } from '../types'

const UserSchema: Schema = new Schema(
  {
    username: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    avatar: { type: String },
    contact_url: { type: String },
    role: { type: String }
  },
  {
    timestamps: true
  }
)

export const UserModel = model<IUser>('User', UserSchema)
