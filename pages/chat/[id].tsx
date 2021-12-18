import styled from "styled-components"
import { User } from "../../components/User"
import { IMessage } from "../../types"
import { useAppSelector } from '../../store'

const Page = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  width: 100%;
  grid-area: "chat";
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  border-left: 1px solid gainsboro;
  border-right: 1px solid gainsboro;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gainsboro;
`

const Messages = styled.div`
  max-width: 680px;
  min-width: 320px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`

const MessageBubble = styled.div`
  border: 1px solid gainsboro;
  border-radius: 15px;
  max-width: 320px;
  padding: 10px 14px;
  margin: 2px 12px;
  word-break: break-word;
  white-space: pre-wrap;
`

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Date = styled.p`
  color: grey;
  font-size: 13px;
  white-space: nowrap;
  margin: 15px;
`

const InputContainer = styled.div`
  width: 100%;
  max-width: 680px;
  border-top: 1px solid gainsboro;
`

const Placeholder = styled.h2`
  height: 50px;
  width: 100%;
  margin: auto 0;
  text-align: center;
`

const Chat = (userId : number) => {
  const users = useAppSelector((state) => state.users)
  const currentUserId = useAppSelector((state) => state.currentUserId)
  const user = users[userId]
  const currentUser = users[currentUserId]

  const getMessages = () => {
    let messages: IMessage[] = []
    userId >= 0 &&
      currentUser.messages.map(
        (message) =>
          message.recipientId === userId && messages.push(message)
      ) &&
      user.messages.map(
        (message) =>
          message.recipientId === currentUserId &&
          messages.push(message)
      )
    return messages
  }

  return (
    <Page>
      {userId >= 0 && (
        <Header>
          <User user={user} link="/user/" />
        </Header>
      )}
      <Messages>
        {userId >= 0 ? (
          getMessages()
            .sort((a, b) => b.date - a.date)
            .map((message) =>
              message.recipientId !== currentUserId ? (
                <MessageContainer>
                  {/* <Date>{timeSince(message.date)}</Date> */}
                  <MessageBubble>{message.text}</MessageBubble>
                </MessageContainer>
              ) : (
                <MessageContainer>
                  <MessageBubble>{message.text}</MessageBubble>
                  {/* <Date>{timeSince(message.date)}</Date> */}
                </MessageContainer>
              )
            )
        ) : (
          <Placeholder>Select chat</Placeholder>
        )}
      </Messages>
      {userId >= 0 && (
        <InputContainer>
          {/* <Input
            onclick={createMessage}
            id={userId}
            placeholder={"Add a message"}
          /> */}
        </InputContainer>
      )}
    </Page>
  )
}

export default Chat