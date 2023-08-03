import { Category, Role } from './enums'

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
  contact_url: string
  role: Role
}

export interface IPost {
  userId: string
  title: string
  content: string
  category: Category
  url: string
  tags: string[]
  isDeleted: boolean
}

export interface IComment {
  authorId: string
  content: string
  isDeleted: boolean
}

export interface ITokenData {
  userId: string
  userRole: string
  iat: number
  exp: number
}

export type NonSensitiveInfoPostEntry = Omit<IPost, 'user_id'>
export type NewPostEntry = Omit<NonSensitiveInfoPostEntry, 'url' | 'isDeleted'>
export type NewUserEntry = Omit<IUser, 'role' | 'contact_url' | 'avatar' | 'isDeleted'>
export type UserCredentials = Omit<IUser, 'role' | 'contact_url' | 'avatar' | 'firstname' | 'lastname' | 'username' | 'isDeleted'>
export type ITokenPayload = Omit<ITokenData, 'iat' | 'exp'>
