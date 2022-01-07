import { useState } from "react"
import HomeIcon from "../public/home.svg"
import MessengerIcon from "../public/message.svg"
import PlusIcon from "../public/plus.svg"
import HeartIcon from "../public/heart.svg"
import styled from "styled-components"
// import { Input } from "./Input"
import Link from "next/link"
import { createPost, useAppSelector } from "../store"
import { useRouter } from "next/router"

const AppHeader = styled.header`
  height: 50px;
  width: 100%;
  margin: 0 auto;
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-bottom: 1px solid gainsboro;
  @media (max-width: 639px) {
    border-top: 1px solid gainsboro;
    position: fixed;
    margin-top: auto;
    bottom: 0;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  margin: 0 auto;

  @media (max-width: 639px) {
    display: flex;
    justify-content: space-evenly;
  }
`

const HeaderLogo = styled.a`
  height: 100%;
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 22px;
  display: flex;
  margin-left: 12px;
  align-items: center;

  @media (max-width: 639px) {
    display: none;
  }
`

const Nav = styled.nav`
  height: 100%;
  display: flex;
`

const StyledLink = styled.a<{ $active: boolean }>`
  border-bottom: ${(props) => props.$active && "2px solid black"};
  padding: 13px;
`

const Button = styled.button<{ $active: boolean }>`
  border-bottom: ${(props) => props.$active && "2px solid black"};
  padding: 13px;
`

const Overlay = styled.div`
  position: fixed;
  top: 50px;
  width: 300px;
  margin: 0 auto;
  overflow-x: auto;
  background-color: white;
  border: 1px solid gainsboro;
`

export const Header = () => {
  const [overlay, setOverlay] = useState(false)
  const currentUserId = useAppSelector((state) => state.currentUserId)
  const { pathname } = useRouter()

  return (
    <AppHeader>
      <HeaderContainer>
        <Link href="/">
          <HeaderLogo>social-network</HeaderLogo>
        </Link>
        <Nav>
          <Link href="/">
            <StyledLink $active={pathname === "/"}>
              <img src={HomeIcon} alt="" />
            </StyledLink>
          </Link>
          <Button $active={overlay} onClick={() => setOverlay(!overlay)}>
            <img src={PlusIcon} alt="" />
          </Button>
          {overlay && (
            <Overlay>
              {/* <Input
                onclick={createPost}
                placeholder={"Enter link to image"}
                id={-1}
              /> */}
            </Overlay>
          )}
          <Link href="chats">
            <StyledLink $active={pathname.includes("/chat")}>
              <img src={MessengerIcon} alt="" />
            </StyledLink>
          </Link>
          <Link href="liked">
            <StyledLink $active={pathname.includes("/liked")}>
              <img src={HeartIcon} alt="" />
            </StyledLink>
          </Link>
          <Link href={"/user/" + currentUserId}>
            <StyledLink $active={pathname.includes("/user")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </StyledLink>
          </Link>
        </Nav>
      </HeaderContainer>
    </AppHeader>
  )
}
