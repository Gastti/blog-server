import { Category } from './enums'

export interface IPost {
  user_id: number
  title: string
  content: string
  category: Category
  url: string
  tags: string[]
}

export type NonSensitiveInfoPostEntry = Omit<IPost, 'user_id'>
export type NewPostEntry = Omit<NonSensitiveInfoPostEntry, 'url'>
