import { Category, Role } from './enums'
import mongoose from 'mongoose'

export type MongoId = mongoose.Types.ObjectId

declare global {
  namespace Express {
    interface Request {
      authenticatedUser: {
        userId: string
        userRole: string
      }
    }
  }
}

export interface IUser {
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
  avatar: string
  contactUrl: string
  biography: string
  role: Role
  isDeleted: boolean
}

export interface MongoAuthor {
  type: MongoId
  ref: string
}

export interface IPost {
  _id?: string
  author: string
  title: string
  content: string
  category: Category
  image: Image
  url: string
  tags: string[]
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export interface IComment {
  author: string
  postId: string
  content: string
  isDeleted: boolean
}

export interface IToken {
  token: string
}

export interface ITokenData {
  userId: string
  userRole: string
  iat: number
  exp: number
}

export interface Image {
  _id: string
  url: string
  key: string
  expirationDate: string
}

export type NonSensitiveInfoPostEntry = Omit<IPost, 'user_id'>
export type NonSensitiveUserData = Omit<IUser, 'email' | 'password' | 'isDeleted'>

export type NewPostEntry = Omit<NonSensitiveInfoPostEntry, 'url' | 'isDeleted' | 'author' | 'createdAt' | 'updatedAt' | 'image'>
export type NewUserEntry = Omit<IUser, 'role' | 'contactUrl' | 'avatar' | 'isDeleted' | 'biography'>
export type NewCommentEntry = Omit<IComment, 'isDeleted'>

export type EditPostEntry = Omit<NewPostEntry, 'image'>
export type EditUserEntry = Omit<IUser, 'role' | 'email' | 'isDeleted' | 'username' | 'password'>

export type UserCredentials = Omit<IUser, 'role' | 'contactUrl' | 'avatar' | 'firstname' | 'lastname' | 'username' | 'isDeleted' | 'biography'>

export type ITokenPayload = Omit<ITokenData, 'iat' | 'exp'>

export type ImageEntry = Omit<Image, '_id'>
