import Link from 'next/link'
import {User} from "../types";
import {FC} from "react";
import Image from "next/image";
import {getChatMessages, timeSince} from "../utils";
import {useAppDispatch, useAppSelector} from "../store";

interface Props {
	user: User
}

export const ChatLink: FC<Props> = ({user}) => {
	const users = useAppSelector((state) => state.users)
	const currentUserId = useAppSelector((state) => state.currentUserId)
	const lastMessage = getChatMessages(users, currentUserId, user.id).slice(-1)[0]

	return (
		<Link href={'/chat/' + user.id}>
			<a className="p-2 flex shrink-0">
				<div className="shrink-0 h-12">
					<Image width="48" height="48" className="relative rounded-full object-fill" src={user.avatar} alt="User's avatar"/>
				</div>
				<div className="flex flex-col w-full justify-between ml-4">
					<div className="flex justify-between items-center">
						<p className="font-medium ">{user.name}</p>
						<div className="text-neutral-500 ">{timeSince(lastMessage.date)}</div>
					</div>
					<p className="text-neutral-500  mb-1 truncate w-64">{lastMessage.text}</p>
				</div>
			</a>
		</Link>)}