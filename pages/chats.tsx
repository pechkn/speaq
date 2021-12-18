import styled from "styled-components"
import { User } from "../components/User"
import { NextPage } from "next"
import { useAppSelector } from "../store"
import { useMemo } from "react"
import { IUser } from '../types'

const Page = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 5px 0;
  grid-area: "chats";
  @media (min-width: 640px) {
    width: 320px;
    border-left: 1px solid gainsboro;
  }
`

const Chats: NextPage = () => {
  const users = useAppSelector((state) => state.users)
  const currentUserId = useAppSelector((state) => state.currentUserId)

  const getChats = () => {
    let chats : IUser[] = []
    users.filter(
      (user) =>
        user.id !== currentUserId &&
        user.messages.filter(
          (message) => message.recipientId === currentUserId && chats.push(user)
        )
    )
    users[currentUserId].messages.map((message) =>
      chats.push(users[message.recipientId])
    )
    return chats.filter((chat, index) => chats.indexOf(chat) === index)
  }

  const chats = useMemo(getChats, [users])

  return (
    <Page>
      {chats
        .map((user) => (
          <User user={user} link="/chat/" />
        ))}
    </Page>
  )
}

export default Chats