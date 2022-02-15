import { store } from "./store"

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export interface Message {
  id: number
  senderId: number
  recipientId: number
  text: string
  date: number
}

export interface User {
  id: number
  email: string
  name: string
  avatar: string
  messages: Message[]
  following: number[]
  savedMessages: number[]
}

export interface Group {
  id: number
  name: string
  avatar: string
  members: number[]
  messages: Message[]
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
  groups: Group[]
}

export interface WindowSize {
  width: number | undefined
  height: number | undefined
}
