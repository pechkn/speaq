import {useAppSelector} from '../../store'
import {NextPage} from "next";
import {useRouter} from 'next/router'
import {MessageInput} from "../../components/MessageInput";
import Link from "next/link";
import Image from "next/image";
import {getChatMessages, getDate} from "../../utils";

const Chat: NextPage = () => {
	const users = useAppSelector((state) => state.users)
	const currentUserId = useAppSelector((state) => state.currentUserId)
	const router = useRouter()
	const {id} = router.query
	let recipientId: number = 0
	if (id != null) {
		recipientId = parseInt(id[0])
	}

	const renderMessages = () => {
		const messages = getChatMessages(users, currentUserId, recipientId)
		const elements = []
		for (let i = 0; i < messages.length; i++) {
			const message = messages[i]
			const sender = users[message.senderId]
			if (i === 0 || message.date - messages[i - 1].date > 300000) elements.push(
					<Link href={'/user/' + message.senderId}>
						<a className="mx-2 p-2 flex gap-2 mt-2 items-center leading-none w-full rounded-t-xl">
							<div className="shrink-0 h-8">
								<Image width="32" height="32" className="relative rounded-full object-fill" src={sender.avatar} alt="User's avatar"/>
							</div>
							<p className="font-medium leading-none">{sender.name}</p>
							<p className="text-neutral-500 leading-none">{getDate(message.date)}</p>
						</a>
					</Link>)
			elements.push(<p className="mx-2 p-2 pt-0 rounded-b-xl">{message.text}</p>)
		}
		return elements
	}

	return (
			<div>
				<header className="p-2 w-full z-10 bg-white shadow-sm sticky top-0">
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center">
							<button className='m-2' onClick={() => router.back()}>
								<svg className="text-inherit fill-current h-6" viewBox="0 0 24 24">
									<path className="text-inherit" fillRule="evenodd" clipRule="evenodd"
												d="M18.6537 0.271157C18.7396 0.356893 18.8078 0.458743 18.8543 0.570875C18.9009 0.683007 18.9248 0.803216 18.9248 0.924619C18.9248 1.04602 18.9009 1.16623 18.8543 1.27836C18.8078 1.39049 18.7396 1.49234 18.6537 1.57808L8.22966 12.0002L18.6537 22.4224C18.827 22.5957 18.9243 22.8308 18.9243 23.0759C18.9243 23.321 18.827 23.556 18.6537 23.7293C18.4804 23.9026 18.2453 24 18.0002 24C17.7551 24 17.5201 23.9026 17.3467 23.7293L6.27113 12.6537C6.18517 12.568 6.11698 12.4661 6.07045 12.354C6.02392 12.2419 5.99997 12.1216 5.99997 12.0002C5.99997 11.8788 6.02392 11.7586 6.07045 11.6465C6.11698 11.5344 6.18517 11.4325 6.27113 11.3468L17.3467 0.271157C17.4325 0.185204 17.5343 0.11701 17.6465 0.0704803C17.7586 0.0239508 17.8788 0 18.0002 0C18.1216 0 18.2418 0.0239508 18.354 0.0704803C18.4661 0.11701 18.5679 0.185204 18.6537 0.271157Z"/>
								</svg>
							</button>
							<h1 className="m-2 text-xl font-medium leading-none">Chat with {users[recipientId].name}</h1>
						</div>
						<svg className="text-inherit fill-current h-6" viewBox="0 0 24 24">
							<path className="text-inherit"
										d="M14.6154 19.6923C14.6154 20.3043 14.3723 20.8913 13.9395 21.3241C13.5067 21.7569 12.9197 22 12.3077 22C11.6957 22 11.1087 21.7569 10.6759 21.3241C10.2431 20.8913 10 20.3043 10 19.6923C10 19.0803 10.2431 18.4933 10.6759 18.0605C11.1087 17.6277 11.6957 17.3846 12.3077 17.3846C12.9197 17.3846 13.5067 17.6277 13.9395 18.0605C14.3723 18.4933 14.6154 19.0803 14.6154 19.6923ZM14.6154 12C14.6154 12.612 14.3723 13.199 13.9395 13.6318C13.5067 14.0646 12.9197 14.3077 12.3077 14.3077C11.6957 14.3077 11.1087 14.0646 10.6759 13.6318C10.2431 13.199 10 12.612 10 12C10 11.388 10.2431 10.801 10.6759 10.3682C11.1087 9.93544 11.6957 9.69231 12.3077 9.69231C12.9197 9.69231 13.5067 9.93544 13.9395 10.3682C14.3723 10.801 14.6154 11.388 14.6154 12ZM14.6154 4.30769C14.6154 4.91973 14.3723 5.5067 13.9395 5.93948C13.5067 6.37225 12.9197 6.61538 12.3077 6.61538C11.6957 6.61538 11.1087 6.37225 10.6759 5.93948C10.2431 5.5067 10 4.91973 10 4.30769C10 3.69565 10.2431 3.10868 10.6759 2.67591C11.1087 2.24313 11.6957 2 12.3077 2C12.9197 2 13.5067 2.24313 13.9395 2.67591C14.3723 3.10868 14.6154 3.69565 14.6154 4.30769Z"/>
						</svg>
					</div>
				</header>
				<div className="flex flex-col justify-between h-full">
					<div className="flex flex-col overflow-y-auto pb-14 h-full">
						{renderMessages()}
					</div>
					<MessageInput recipientId={recipientId}/>
				</div>
			</div>
	)
}

export default Chat