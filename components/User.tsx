import styled from "styled-components"
import { IUser } from "../types"
import Link from "next/link"

const Component = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
`

const Username = styled.p`
  color: black;
  text-decoration: none;
  font-weight: 600;
`

const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 10px;
  object-fit: cover;
`

export interface IProps {
  user: IUser
  link: string
}

export const User = ({ user, link }: IProps) => (
  <Component href={link + user.id}>
    <a>
      <Avatar src={user.avatar} />
      <Username>{user.name}</Username>
    </a>
  </Component>
)
