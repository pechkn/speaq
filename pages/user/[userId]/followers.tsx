import styled from "styled-components"
import { useAppSelector } from "../../../store"
import { User } from "../../../components/User"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px auto;
  align-items: center;
`

const Heading = styled.h1`
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
`

const Followers = (userId: number) => {
  const users = useAppSelector((state) => state.users)
  const user = users[userId]
  const userFollowers = users.filter((user) => user.following.includes(userId))

  return (
    <Page>
      <Heading>
        {userFollowers.length > 0
          ? user.name + "'s followers"
          : user.name + " has no followers"}
      </Heading>
      {userFollowers.map((user) => (
        <User user={user} link="/user/" />
      ))}
    </Page>
  )
}

export default Followers