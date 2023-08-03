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

export interface IPost {
  userId: string
  title: string
  content: string
  category: Category
  url: string
  tags: string[]
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

export interface ITokenData {
  userId: string
  userRole: string
  iat: number
  exp: number
}

export type NonSensitiveInfoPostEntry = Omit<IPost, 'user_id'>
export type NewPostEntry = Omit<NonSensitiveInfoPostEntry, 'url'>
export type NewUserEntry = Omit<IUser, 'role' | 'contact_url' | 'avatar'>
export type UserCredentials = Omit<IUser, 'role' | 'contact_url' | 'avatar' | 'firstname' | 'lastname' | 'username'>
export type ITokenPayload = Omit<ITokenData, 'iat' | 'exp'>
