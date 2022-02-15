import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialState } from "./initialState"

export const reducerSlice = createSlice({
  name: "reducerSlice",
  initialState,
  reducers: {
    saveMessage: (state, action: PayloadAction<number>) => {
      const postId = action.payload
      const { savedMessages } = state.users[state.currentUserId]
      savedMessages.includes(postId)
        ? savedMessages.splice(savedMessages.indexOf(postId), 1)
        : savedMessages.push(postId)
    },
    createMessage: (
      state,
      action: PayloadAction<{ text: string; recipientId: number }>
    ) => {
      const { text, recipientId } = action.payload
      state.users[state.currentUserId].messages.push({
        id: state.users.map(user => user.messages).length,
        senderId: state.currentUserId,
        recipientId,
        text,
        date: Date.now() / 1000,
      })
    },
    toggleFollow: (state, action: PayloadAction<number>) => {
      const userId = action.payload
      const { following } = state.users[state.currentUserId]
      following.includes(userId)
        ? following.splice(following.indexOf(userId), 1)
        : following.push(userId)
    },
    setCurrentUser: (state, action: PayloadAction<string | null>) => {
      state.currentUserId =
        state.users.find((user) => user.name === action.payload)?.id || -1
    },
    createUser: (state, action: PayloadAction<string>) => {
      const email = action.payload
      state.users.push({
        id: state.users.length,
        email,
        name: '',
        avatar:
          "https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1427&q=80",
        messages: [],
        following: [],
        savedMessages: [],
      })
    },
  },
})
