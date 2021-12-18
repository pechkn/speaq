import Link from "next/link"
import styled from "styled-components"
import { Post } from "../../../components/Post"
import {
  setCurrentUser,
  toggleFollow,
  useAppDispatch,
  useAppSelector,
} from "../../../store"

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
`

const ProfileDesc = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  flex-wrap: wrap;
  justify-content: center;
`

const Avatar = styled.img`
  height: 30vw;
  width: 30vw;
  max-width: 120px;
  max-height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 12px;
`

const DescBody = styled.div`
  width: 100%;
  max-width: 320px;
`

const Name = styled.h2`
  font-size: 20px;
`

const Button = styled.button`
  border-radius: 4px;
  border: 1px solid gainsboro;
  padding: 0 12px;
  height: 30px;
  margin: 6px;
  font-size: 14px;
  cursor: pointer;
`

const LinkButton = styled.a`
  border-radius: 4px;
  border: 1px solid gainsboro;
  padding: 6px 12px;
  margin: 6px;
  font-size: 14px;
`

const Status = styled.pre`
  word-break: break-word;
  white-space: pre-wrap;
  margin: 6px 12px;
`

const Posts = styled.div`
  width: 100%;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 0 12px;
`

const User = (userId: number) => {
  const users = useAppSelector((state) => state.users)
  const currentUserId = useAppSelector((state) => state.currentUserId)
  const dispatch = useAppDispatch()
  const user = users[userId]
  const currentUser = users[currentUserId]
  const isCurrentUserProfile = userId !== currentUserId
  const followersCount = users.filter((user) =>
    user.following.includes(userId)
  ).length

  const getUserPosts = () =>
    users[userId].posts.slice().sort((a, b) => b.date - a.date)

  return (
    <Page>
      <ProfileDesc>
        <Avatar src={users[userId].avatar} />
        <DescBody>
          <Container>
            <Name>{users[userId].name}</Name>
            {isCurrentUserProfile ? (
              <Button onClick={() => dispatch(setCurrentUser(null))}>
                Logout
              </Button>
            ) : (
              <>
                <Link href={"/chat/" + userId}>
                  <LinkButton>Message</LinkButton>
                </Link>
                <Button onClick={() => dispatch(toggleFollow(userId))}>
                  {currentUser.following.includes(userId)
                    ? "Unfollow"
                    : "Follow"}
                </Button>
              </>
            )}
          </Container>
          <Status>{user.status}</Status>
          <Container>
            {user.posts.length} post
            {user.posts.length !== 1 && "s"}
            <Link href={"/user/" + userId + "/followers"}>
              <a>
                {followersCount} follower
                {followersCount > 1 && "s"}
              </a>
            </Link>
            <Link href={"/user/" + userId + "/following"}>
              <a>{users[userId].following.length} following</a>
            </Link>
          </Container>
        </DescBody>
      </ProfileDesc>
      <Posts>
        {getUserPosts().map((post) => (
          <Post
            id={post.id}
            user={users[userId]}
            date={post.date}
            img={post.img}
            likes={
              users.filter((user) => user.likedPosts.includes(post.id)).length
            }
          />
        ))}
      </Posts>
    </Page>
  )
}

export default User