import Link from 'next/link'
import {User} from "../types";
import {FC} from "react";
import Image from "next/image";

interface Props {
	user: User
}

export const ChatLink: FC<Props> = ({user}) =>
		<Link href={'/chat/' + user.id}>
			<a className="p-2 flex shrink-0">
				<div className="shrink-0 h-12">
					<Image width="48" height="48" className="relative rounded-full object-fill" src={user.avatar} alt="User's avatar"/>
				</div>
				<div className="flex flex-col w-full justify-between ml-4">
					<div className="flex justify-between items-center">
						<p className="font-medium leading-none">{user.name}</p>
						<div className="text-neutral-500 leading-none">1w</div>
					</div>
					<p className="text-neutral-500 leading-none mb-1 truncate w-64">Last message adsasdadadsdsdadsadasdasdasdr</p>
				</div>
			</a>
		</Link>