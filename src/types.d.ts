import { Category, Role } from './enums'

export interface IPost {
  user_id: number
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
  rol: Role
}

export type NonSensitiveInfoPostEntry = Omit<IPost, 'user_id'>
export type NewPostEntry = Omit<NonSensitiveInfoPostEntry, 'url'>
