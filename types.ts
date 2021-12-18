import { store } from "./store"

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export interface IMessage {
  recipientId: number
  text: string
  date: number
}

export interface IPost {
  id: number
  img: string
  date: number
}

export interface IComment {
  postId: number
  text: string
  date: number
}

export interface IUser {
  id: number
  name: string
  avatar: string
  status: string
  posts: IPost[]
  messages: IMessage[]
  comments: IComment[]
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

export interface IState {
  currentUserId: number
  users: IUser[]
}
