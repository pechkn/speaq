import { State } from "../types"

export const initialState: State = {
  currentUserId: 0,
  users: [
    {
      id: 0,
      name: "pechkin",
      avatar:
        "https://images.unsplash.com/photo-1503212556734-c0ca0c49c8b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHNpbGhvdWV0dGV8ZW58MHwyfDB8&auto=format&fit=crop&w=400&q=60",
      status: `The Creator in person`,
      posts: [
        {
          id: 0,
          date: 1613840000,
          img: "https://images.unsplash.com/photo-1613572596126-23969094b944?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        },
        {
          id: 4,
          date: 1613849000,
          img: "https://images.unsplash.com/photo-1613586020253-fb6fe0b04269?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        },
      ],
      messages: [
        {
          recipientId: 1,
          text: "Sup",
          date: 1613847000,
        },
        {
          recipientId: 2,
          text: "How are you?",
          date: 1613840000,
        },
      ],
      comments: [
        {
          postId: 0,
          text: "Sample post with text and image",
          date: 1613840000,
        },
        {
          postId: 3,
          text: "Sample comment with a ton of post-related text. There are so many words that they look like they wouldn't fit, but they do with some text wrapping and comment sizing.",
          date: 1613899000,
        },
        {
          postId: 2,
          text: "Sample comment",
          date: 1613847000,
        },
      ],
      following: [1, 2, 3, 4],
      likedPosts: [3, 4],
    },
    {
      id: 1,
      name: "ryanmiller",
      avatar:
        "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
      status: `Somewhat busy nowadays`,
      posts: [
        {
          id: 1,
          date: 1613820000,
          img: "https://images.unsplash.com/photo-1613568409506-e70370442e6e?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1MXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        },
      ],
      messages: [
        {
          recipientId: 0,
          text: "Hey",
          date: 1613848000,
        },
      ],
      comments: [
        {
          postId: 1,
          text: "Sample post from me",
          date: 1613820000,
        },
      ],
      following: [0],
      likedPosts: [1],
    },
    {
      id: 2,
      name: "russelcooper",
      avatar:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80",
      status: `All everybody wants is to drink molten chocolate in front of the window in the rainy day`,
      posts: [
        {
          id: 2,
          date: 1613700000,
          img: "https://images.unsplash.com/photo-1564869115811-96da66f0557f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlJTIwZ3JlZW58ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        },
      ],
      messages: [
        {
          recipientId: 0,
          text: `I'm fine. What's about you?`,
          date: 1613848000,
        },
      ],
      comments: [
        {
          postId: 3,
          text: "Another sample comment",
          date: 1613847000,
        },
      ],
      following: [0, 1, 4],
      likedPosts: [3],
    },
    {
      id: 3,
      name: "anastasialeonore",
      avatar:
        "https://images.unsplash.com/photo-1511963211013-83bba110595d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: `state-taught photographer`,
      posts: [],
      messages: [],
      comments: [
        {
          postId: 3,
          text: "More sample comments on this post!",
          date: 1613849000,
        },
      ],
      following: [0, 2],
      likedPosts: [1, 3, 4],
    },
    {
      id: 4,
      name: "alicehierro",
      avatar:
        "https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8c2lsaG91ZXR0ZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
      status: `be better than you were yesterday!`,
      posts: [
        {
          id: 3,
          date: 1613841000,
          img: "https://images.unsplash.com/photo-1613591767283-c120294bb16b?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        },
      ],
      messages: [],
      comments: [
        {
          postId: 3,
          text: "Post with some text about this and that",
          date: 1614000000,
        },
        {
          postId: 4,
          text: "Sample comment from sample user",
          date: 1613847000,
        },
      ],
      following: [0, 1],
      likedPosts: [],
    },
  ],
}
