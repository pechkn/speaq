import styled from "styled-components";
import { useAppSelector } from "../../../store";
import { User } from "../../../components/User";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px auto;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
`;

const Following = (userId : number) => {
  const users = useAppSelector((state) => state.users)
  const user = users[userId]
  const userFollowing = users[userId].following
  return (
    <Page>
      <Heading>
        {user.following.length > 0
          ? user.name + " is following"
          : user.name + " doesn't follow anyone"}
      </Heading>
      {userFollowing.map((userId) => (
        <User user={users[userId]} link="/user/" />
      ))}
    </Page>
  )
}

export default Following
