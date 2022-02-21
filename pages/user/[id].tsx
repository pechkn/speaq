import {
  useAppSelector,
} from "../../store"
import {FC} from "react";

interface Props {
  userId: number
}

const User : FC<Props> = ({userId}) => {
  const users = useAppSelector((state) => state.users)
  const currentUserId = useAppSelector((state) => state.currentUserId)
  const user = users[userId]
  const currentUser = users[currentUserId]
  const isCurrentUserProfile = userId !== currentUserId

  return (
    <>
      <div>User id {user.id}</div>
      <div>User email {user.email}</div>
    </>
  )
}

export default User