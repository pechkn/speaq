import Link from 'next/link'
import {Message as TMessage, User} from "../types";
import {FC} from "react";
import {timeSince} from "../utils";
import Image from "next/image";

interface Props {
	// messages: Message[]
}

export const Message: FC<Props> = () => {

	return (
				<div>
					{/*<Link href={'/user/' + user.id}>*/}
					{/*	<a className="p-2 flex items-center">*/}
					{/*		<div className="shrink-0 h-8 m-2">*/}
					{/*			<Image width="32" height="32" className="relative rounded-full object-fill" src={user.avatar}*/}
					{/*						 alt="User's avatar"/>*/}
					{/*		</div>*/}
					{/*		<p className="m-2 font-medium leading-none">{user.name}</p>*/}
					{/*		<div className="m-2 text-neutral-500 leading-none">{timeSince(message.date)}</div>*/}
					{/*	</a>*/}
					{/*</Link>*/}
					{/*{message.text}*/}
				</div>
	)
}