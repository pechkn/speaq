import { store } from "./store"

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export interface Message {
  recipientId: number
  text: string
  date: number
}

export interface Post {
  id: number
  img: string
  date: number
}

export interface Comment {
  postId: number
  text: string
  date: number
}

export interface User {
  id: number
  name: string
  avatar: string
  status: string
  posts: Post[]
  messages: Message[]
  comments: Comment[]
  following: number[]
  likedPosts: number[]
}

export interface RelativeTimeFormatUnits {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export type RelativeTimeFormatUnit =
  | "year"
  | "years"
  | "quarter"
  | "quarters"
  | "month"
  | "months"
  | "week"
  | "weeks"
  | "day"
  | "days"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "second"
  | "seconds"

export interface State {
  currentUserId: number
  users: User[]
}
