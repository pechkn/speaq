import {
  clearChat,
  useAppSelector,
} from "../../store"
import {FC} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import {BackButton} from "../../components/BackButton";

const User = () => {
  const users = useAppSelector((state) => state.users)
  const router = useRouter()
  const {id} = router.query
  let userId = 0
  if (id) {
    userId = parseInt(id[0])
  }
  const user = users[userId]

  return (
    <>
      <header className="w-full z-10 bg-white shadow-sm sticky top-0 p-2">
        <div className="flex w-full items-center">
          <BackButton />
          <h1 className="font-medium text-xl px-2">{user.name}</h1>
        </div>
      </header>
      <Image width="360" height="360" className="object-cover" src={user.avatar} alt="User's avatar"/>
      <div>{user.email}</div>
    </>
  )
}

export default User