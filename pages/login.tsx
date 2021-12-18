import { MutableRefObject, useRef } from "react"
import styled from "styled-components"
import {
  createUser,
  setCurrentUser,
  useAppDispatch,
  useAppSelector,
} from "../store"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  justify-content: center;
  padding-top: 10vh;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  padding: 20px;
`

const Input = styled.input`
  height: 36px;
  border: 1px solid gainsboro;
  border-radius: 4px;
  font-size: 15px;
  height: 36px;
  min-width: 120px;
  padding: 0 12px;
  margin: 8px 0;
`

const Note = styled.p`
  padding: 20px 12px;
  box-sizing: border-box;
  width: 100%;
  max-width: 540px;
`

const Link = styled.a`
  display: block;
  text-transform: lowercase;
  margin: 20px auto;
`

const Login = () => {
  const loginUsername = useRef() as MutableRefObject<HTMLInputElement>
  const registerUsername = useRef() as MutableRefObject<HTMLInputElement>
  const avatar = useRef() as MutableRefObject<HTMLInputElement>
  const status = useRef() as MutableRefObject<HTMLInputElement>
  const users = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  return (
    <Page>
      <Container>
        <Form>
          <Input type="text" placeholder="Username" ref={loginUsername} />
          <Input
            type="submit"
            value="Login"
            onClick={() => {
              if (loginUsername.current.value) {
                users.find(
                  (user) => user.name === loginUsername.current.value
                )
                  ? dispatch(setCurrentUser(loginUsername.current.value))
                  : alert("Incorrect name")
              }
            }}
          />
        </Form>
        <Form>
          <Input type="text" placeholder="Username" ref={registerUsername} />
          <Input
            type="text"
            placeholder="Link to profile picture"
            ref={avatar}
          />
          <Input type="text" placeholder="Profile status" ref={status} />
          <Input
            type="submit"
            value="Register"
            onClick={() => {
              if (registerUsername.current.value) {
                !users.find(
                  (user) => user.name === registerUsername.current.value
                )
                  ? (dispatch(
                      createUser({
                        name: registerUsername.current.value,
                        avatar: avatar.current.value,
                        status: status.current.value,
                      })
                    ),
                    dispatch(setCurrentUser(registerUsername.current.value)))
                  : alert("User already exists")
              }
            }}
          />
        </Form>
      </Container>
      <Note>
        This website is not real. Users are fictional, photos are
        copyright-free. All data (messages, posts, etc) is not sent anywhere and
        exist only in your browser. No password is required, you can log in with
        any existing name (try <b>pechkin</b>) or register a new one.
      </Note>
      <Link href="https://pechk.in">developed by pechkin</Link>
    </Page>
  )
}

export default Login