import {useAppSelector} from "../store"
import {User} from "../types"
import {useMemo} from "react"
import {ChatLink} from "../components/ChatLink"
import {NextPage} from "next"
import Link from "next/link"
import Image from "next/image"

const Chats: NextPage = () => {
	const currentUserId = useAppSelector((state) => state.currentUserId)
	const users = useAppSelector((state) => state.users)

	const getChats = () => {
		let chats: User[] = []
		users.forEach((user) => {
					if (user.id !== currentUserId) {
						user.messages.forEach(
								(message) => message.recipientId === currentUserId && chats.push(user)
						)
					}
				}
		)
		users[currentUserId].messages.forEach((message) =>
				chats.push(users[message.recipientId])
		)
		return chats.filter((chat, index) => chats.indexOf(chat) === index)
	}

	const chats = useMemo(getChats, [users, currentUserId])

	return (
			<>
				<header className="w-full sticky top-0 z-10 bg-white shadow-sm">
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center">
							<Link href="/">
								<a className='p-4 text-blue-600'>
									<svg className="text-inherit fill-current h-6" viewBox="0 0 26 24">
										<circle className="text-inherit" r="3" transform="matrix(-1 0 0 1 23 21)"/>
										<rect className="text-inherit" width="6" height="18" rx="3" transform="matrix(-1 0 0 1 18 6)"/>
										<rect className="text-inherit" width="6" height="16" rx="3" transform="matrix(-1 0 0 1 26 0)"/>
										<path className="text-inherit" fillRule="evenodd" clipRule="evenodd"
													d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9C12 10.6569 10.6569 12 9 12Z"/>
									</svg>
								</a>
							</Link>
							<h1 className="text-xl font-medium ">Chats</h1>
						</div>
						<Link href={"/user/" + currentUserId}>
							<a className="px-4 flex items-center">
								<Image height="32" width="32" className="rounded-full object-cover"
											 src={users[currentUserId].avatar} alt="User's avatar"/>
							</a>
						</Link>
					</div>
				</header>
				<div className='p-2'>
					{chats
							.map((user) => (
									<ChatLink user={user} key={user.id}/>
							))}
				</div>
				<div className="fixed w-full p-4 fixed bottom-0">
					<Link href={"/chat/" + currentUserId}>
						<a className='bg-blue-600 text-white rounded-lg px-4 py-2 block text-center'>Create message</a>
					</Link>
				</div>
			</>
	)
}

export default Chats