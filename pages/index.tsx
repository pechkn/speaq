import type { NextPage } from "next"
import { useMemo } from "react"
import styled from "styled-components"
import { Post } from "../components/Post"
import { useAppSelector } from "../store"

const Container = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-template-areas: "chats chat";
  width: 100%;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Page = styled.div`
  width: 100%;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
`

const Placeholder = styled.h1`
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
`

const Index: NextPage = () => {
  const currentUserId = useAppSelector((state) => state.currentUserId)
  const users = useAppSelector((state) => state.users)

  const getFollowingPosts = () =>
    users
      .map((user) => {
        if (users[currentUserId].following.includes(user.id))
          return user.posts.map((post) => ({
            id: post.id,
            user: users[user.id],
            date: post.date,
            img: post.img,
            likes: users.filter((user) => user.likedPosts.includes(post.id))
              .length,
          }))
      })
      .flat().filter(Boolean)

  const posts = useMemo(getFollowingPosts, [currentUserId, users])

  return (
    <Page>
      {posts.length ? (
        posts
          .sort((a, b) => b!.date - a!.date)
          .map((post) => (
            <Post
              id={post!.id}
              user={post!.user}
              date={post!.date}
              img={post!.img}
              likes={post!.likes}
            />
          ))
      ) : (
        <Placeholder>You don't follow anyone yet</Placeholder>
      )}
    </Page>
  )
}

export default Index

/* <Route
              path="/chats"
              render={() => (
                <Container>
                  <Chats store={store} />
                  {width >= 640 && <ChatPage store={store} userId={-1} />}
                </Container>
              )}
            /> 
            <Route
              path="/chat/:userId"
              component={() => (
                <Container>
                  {width >= 640 && <Chats store={store} />}
                  <ChatPage
                    store={store}
                    userId={parseInt(
                      window.location.pathname.substring(
                        window.location.pathname.lastIndexOf("/") + 1
                      )
                    )}
                  />
                </Container>
              )}
            /> */
