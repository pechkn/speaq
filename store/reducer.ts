import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialState } from "./initialState"

export const reducerSlice = createSlice({
  name: "reducerSlice",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const postId = action.payload
      const { likedPosts } = state.users[state.currentUserId]
      likedPosts.includes(postId)
        ? likedPosts.splice(likedPosts.indexOf(postId), 1)
        : likedPosts.push(postId)
    },
    createPost: (state, action: PayloadAction<string>) => {
      const imgUrl = action.payload
      const { posts } = state.users[state.currentUserId]
      imgUrl
        ? posts.push({
            id: posts.length + 1,
            img: imgUrl,
            date: Date.now() / 1000,
          })
        : alert("No image provided")
    },
    createMessage: (
      state,
      action: PayloadAction<{ text: string; recipientId: number }>
    ) => {
      const { text, recipientId } = action.payload
      state.users[state.currentUserId].messages.push({
        recipientId,
        text,
        date: Date.now() / 1000,
      })
    },
    createComment: (
      state,
      action: PayloadAction<{ text: string; postId: number }>
    ) => {
      const { text, postId } = action.payload
      state.users[state.currentUserId].comments.push({
        postId,
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
    // loadStore: (state) => {
    //   const json = JSON.parse(localStorage.getItem("store")!)
    //   state.users = json.users
    //   state.currentUserId = json.currentUserId
    // },
    createUser: (
      state,
      action: PayloadAction<{
        name: string
        avatar: string
        status: string
      }>
    ) => {
      const { name, avatar, status } = action.payload
      state.users.push({
        id: state.users.length,
        name,
        avatar:
          avatar ||
          "https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1427&q=80",
        status,
        posts: [],
        messages: [],
        comments: [],
        following: [],
        likedPosts: [],
      })
    },
  },
})
