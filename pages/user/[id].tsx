import Link from "next/link"
import {
  setCurrentUser,
  toggleFollow,
  useAppDispatch,
  useAppSelector,
} from "../../store"

const User = (userId: number) => {
  const users = useAppSelector((state) => state.users)
  const currentUserId = useAppSelector((state) => state.currentUserId)
  const dispatch = useAppDispatch()
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