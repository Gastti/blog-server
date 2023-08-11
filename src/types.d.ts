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
  author: string
  title: string
  content: string
  category: Category
  url: string
  tags: string[]
  isDeleted: boolean
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

export type NonSensitiveInfoPostEntry = Omit<IPost, 'user_id'>

export type NewPostEntry = Omit<NonSensitiveInfoPostEntry, 'url' | 'isDeleted' | 'author'>
export type NewUserEntry = Omit<IUser, 'role' | 'contactUrl' | 'avatar' | 'isDeleted' | 'biography'>
export type NewCommentEntry = Omit<IComment, 'isDeleted' >

export type EditUserEntry = Omit<IUser, 'role' | 'email' | 'isDeleted' | 'username' | 'password'>

export type UserCredentials = Omit<IUser, 'role' | 'contactUrl' | 'avatar' | 'firstname' | 'lastname' | 'username' | 'isDeleted' | 'biography'>

export type ITokenPayload = Omit<ITokenData, 'iat' | 'exp'>
