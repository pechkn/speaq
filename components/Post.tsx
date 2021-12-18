import styled from "styled-components"
import HeartIcon from "../public/heart.svg"
import HeartFillIcon from "../public/heart-fill.svg"
import { IUser } from "../types"
// import { timeSince } from "../utils"
import { User } from "./User"
// import { Input } from "./Input"
import {
  createComment,
  toggleLike,
  useAppDispatch,
  useAppSelector,
} from "../store"
import { useMemo } from "react"
import Link from "next/link"

const Component = styled.div`
  margin: 10px auto;
  border: 1px solid gainsboro;
  display: inline-flex;
  flex-wrap: wrap;
  height: 640px;
  box-sizing: border-box;

  @media (max-width: 640px) {
    height: auto;
    border-left: none;
    border-right: none;
  }
`
const PostImg = styled.img`
  height: 100%;
  max-width: 678px;
  width: 50vw;
  object-fit: cover;

  @media (max-width: 640px) {
    width: 100%;
    max-height: 480px;
  }
`

const PostBody = styled.div`
  width: 320px;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 640px) {
    max-height: 280px;
    width: 100%;
    height: auto;
  }
`
const PostHeader = styled.div`
  display: flex;
  align-items: center;
`
const Date = styled.p`
  color: grey;
  font-size: 13px;
  white-space: nowrap;
  margin-right: 10px;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-top: 1px solid gainsboro;
  width: 100%;
  margin-top: 4px;
`

const Button = styled.button`
  margin: 0 0 0 8px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 40px;
`

const Comment = styled.div`
  padding: 6px 12px;
`

const Username = styled.a`
  font-size: 14px;
  font-weight: bold;
  margin-right: 6px;
`

const CommentText = styled.p`
  font-size: 14px;
  word-break: break-word;
  white-space: pre-wrap;
`

const CommentDate = styled.p`
  color: grey;
  font-size: 12px;
  white-space: nowrap;
  margin-left: 6px;
  display: inline;
`

const Comments = styled.div`
  overflow: auto;
  max-height: 560px;
  @media (max-width: 640px) {
    max-height: 160px;
  }
`

interface Props {
  id: number
  user: IUser
  date: number
  img: string
  likes: number
}

export const Post = ({ id, user, date, img, likes }: Props) => {
  const users = useAppSelector((state) => state.users)
  const currentUserId = useAppSelector((state) => state.currentUserId)
  const dispatch = useAppDispatch()

  const getComments = () =>
    users
      .map((user) =>
        user.comments
          .filter((comment) => comment.postId === id)
          .sort((a, b) => b.date - a.date)
          .map((comment) => ({
            user: user,
            text: comment.text,
            date: comment.date,
          }))
      )
      .flat()

  const comments = useMemo(getComments, [users])

  return (
    <Component>
      {img && <PostImg src={img} />}
      <PostBody>
        <PostHeader>
          <User user={user} link="/user/" />
          {/* <Date>{timeSince(date)}</Date> */}
        </PostHeader>
        {comments && (
          <Comments>
            {comments.map((comment) => (
              <Comment>
                <CommentText>
                  <Link href={"/user/" + comment.user.id}>
                    <Username>{comment.user.name}</Username>
                  </Link>
                  {comment.text}
                  <CommentDate>
                    {/* {timeSince(comment.date)!.match(/^[0-9]*\s[a-z]/)} */}
                  </CommentDate>
                </CommentText>
              </Comment>
            ))}
          </Comments>
        )}
        <Actions>
          <Button onClick={() => dispatch(toggleLike(id))}>
            <img
              src={
                users[currentUserId].likedPosts.includes(id)
                  ? HeartFillIcon
                  : HeartIcon
              }
              alt=""
            />
          </Button>
          {likes > 0 && likes}
          {/* <Input
            onclick={createComment}
            id={id}
            placeholder={"Add a comment"}
          /> */}
        </Actions>
      </PostBody>
    </Component>
  )
}
