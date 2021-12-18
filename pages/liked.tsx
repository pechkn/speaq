import styled from 'styled-components'
import { Post } from '../components/Post'
import { useAppSelector } from '../store'

const Page = styled.div`
  width: 100%;
  padding: 5px 0;
`

const Placeholder = styled.h1`
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
`

const Liked = () => {
  const users = useAppSelector((state) => state.users)
  const currentUserId = useAppSelector((state) => state.currentUserId)
  const likedPosts = users[currentUserId].likedPosts
  return (
    <Page>
      {likedPosts.length ? (
        users.map((user) =>
          user.posts.map(
            (post) =>
              likedPosts.includes(post.id) && (
                <Post
                  id={post.id}
                  user={user}
                  date={post.date}
                  img={post.img}
                  likes={
                    users.filter((user) => user.likedPosts.includes(post.id)).length
                  }
                />
              )
          )
        )
      ) : (
        <Placeholder>You haven't liked any posts yet</Placeholder>
      )}
    </Page>
  )
}

export default Liked