import {clearChat, useAppDispatch, useAppSelector} from '../../store'
import {NextPage} from "next";
import {useRouter} from 'next/router'
import {MessageInput} from "../../components/MessageInput";
import Link from "next/link";
import Image from "next/image";
import {getChatMessages, getDate} from "../../utils";
import {useEffect, useRef} from "react";
import {BackButton} from "../../components/BackButton";

const Chat: NextPage = () => {
		const users = useAppSelector((state) => state.users)
		const currentUserId = useAppSelector((state) => state.currentUserId)
		const messagesRef = useRef<HTMLDivElement>(null);
		const dispatch = useAppDispatch()
		const router = useRouter()
		const {id} = router.query
		let recipientId = 0
		if (id) {
			recipientId = parseInt(id[0])
		}

		const renderMessages = () => {
			const messages = getChatMessages(users, currentUserId, recipientId)
			const elements = []
			for (let i = 0; i < messages.length; i++) {
				const message = messages[i]
				const sender = users[message.senderId]
				if (i === 0 || message.date - messages[i - 1].date > 60000) elements.push(
						<Link href={'/user/' + message.senderId} key={message.id}>
							<a className="p-4 pb-2 flex items-center w-full">
								<div className="shrink-0 h-8 mr-2">
									<Image width="32" height="32" className="relative rounded-full object-fill" src={sender.avatar}
												 alt="User's avatar"/>
								</div>
								<p>
									<span className="font-medium">{sender.name}</span>
									<span className="text-neutral-500"> {getDate(message.date)}</span>
								</p>
							</a>
						</Link>)
				elements.push(<p className="px-4 pt-0" key={message.text}>{message.text}</p>)
			}
			return elements
		}

		useEffect(() => {
			if (messagesRef.current) {
				messagesRef.current.scrollIntoView(
						{
							behavior: 'smooth',
							block: 'end',
							inline: 'nearest'
						})
			}
		})

		return (
				<div>
					<header className="w-full z-10 bg-white shadow-sm sticky top-0 p-2">
						<div className="flex w-full items-center justify-between">
								<BackButton />
								<h1 className="font-medium text-xl px-2">{users[recipientId].name}</h1>
								<button className="ml-auto p-2 flex items-center justify-center">
									<svg className="text-inherit fill-current h-6" viewBox="0 0 24 24">
												<path d="M17.613 15.516C19.0654 13.534 19.716 11.0767 19.4345 8.63572C19.1529 6.19471 17.9601 3.95001 16.0946 2.35069C14.2292 0.751381 11.8286 -0.0845947 9.37325 0.0100151C6.91788 0.104625 4.58878 1.12284 2.8519 2.86096C1.11503 4.59908 0.0984757 6.92891 0.00562298 9.38435C-0.0872298 11.8398 0.750464 14.2397 2.35111 16.1041C3.95176 17.9684 6.19732 19.1596 8.63853 19.4394C11.0797 19.7192 13.5366 19.0669 15.5175 17.613H15.516C15.561 17.673 15.609 17.73 15.663 17.7855L21.438 23.5605C21.7193 23.842 22.1008 24.0002 22.4987 24.0003C22.8966 24.0004 23.2783 23.8425 23.5597 23.5612C23.8412 23.28 23.9994 22.8984 23.9996 22.5005C23.9997 22.1026 23.8418 21.721 23.5605 21.4395L17.7855 15.6645C17.7319 15.6102 17.6742 15.5601 17.613 15.5145V15.516ZM18 9.75C18 10.8334 17.7866 11.9062 17.372 12.9071C16.9574 13.9081 16.3497 14.8175 15.5836 15.5836C14.8175 16.3497 13.9081 16.9574 12.9071 17.372C11.9062 17.7866 10.8334 18 9.75 18C8.66659 18 7.5938 17.7866 6.59286 17.372C5.59193 16.9574 4.68245 16.3497 3.91637 15.5836C3.15029 14.8175 2.5426 13.9081 2.12799 12.9071C1.71339 11.9062 1.5 10.8334 1.5 9.75C1.5 7.56196 2.36919 5.46354 3.91637 3.91637C5.46354 2.36919 7.56196 1.5 9.75 1.5C11.938 1.5 14.0365 2.36919 15.5836 3.91637C17.1308 5.46354 18 7.56196 18 9.75V9.75Z" fill="black"/>
									</svg>
								</button>
								<button className="p-2 flex items-center justify-center text-red-600" onClick={() => dispatch(clearChat({recipientId}))}>
									<svg className="text-inherit fill-current h-6" viewBox="0 0 24 24">
										<path className="text-inherit" fillRule="evenodd" clipRule="evenodd"
													d="M22.8 4.8C22.8 5.22435 22.6314 5.63131 22.3314 5.93137C22.0313 6.23143 21.6243 6.4 21.2 6.4H20.4V20.8C20.4 21.6487 20.0629 22.4626 19.4627 23.0627C18.8626 23.6629 18.0487 24 17.2 24H7.6C6.75131 24 5.93737 23.6629 5.33726 23.0627C4.73714 22.4626 4.4 21.6487 4.4 20.8V6.4H3.6C3.17565 6.4 2.76869 6.23143 2.46863 5.93137C2.16857 5.63131 2 5.22435 2 4.8V3.2C2 2.77565 2.16857 2.36869 2.46863 2.06863C2.76869 1.76857 3.17565 1.6 3.6 1.6H9.2C9.2 1.17565 9.36857 0.768687 9.66863 0.468629C9.96869 0.168571 10.3757 0 10.8 0L14 0C14.4243 0 14.8313 0.168571 15.1314 0.468629C15.4314 0.768687 15.6 1.17565 15.6 1.6H21.2C21.6243 1.6 22.0313 1.76857 22.3314 2.06863C22.6314 2.36869 22.8 2.77565 22.8 3.2V4.8ZM6.1888 6.4L6 6.4944V20.8C6 21.2243 6.16857 21.6313 6.46863 21.9314C6.76869 22.2314 7.17565 22.4 7.6 22.4H17.2C17.6243 22.4 18.0313 22.2314 18.3314 21.9314C18.6314 21.6313 18.8 21.2243 18.8 20.8V6.4944L18.6112 6.4H6.1888ZM3.6 4.8V3.2H21.2V4.8H3.6Z"/>
									</svg>
								</button>
								<button className="p-2 flex items-center justify-center">
									<svg className="text-inherit fill-current h-6" viewBox="0 0 24 24">
										<path className="text-inherit"
													d="M14.6154 19.6923C14.6154 20.3043 14.3723 20.8913 13.9395 21.3241C13.5067 21.7569 12.9197 22 12.3077 22C11.6957 22 11.1087 21.7569 10.6759 21.3241C10.2431 20.8913 10 20.3043 10 19.6923C10 19.0803 10.2431 18.4933 10.6759 18.0605C11.1087 17.6277 11.6957 17.3846 12.3077 17.3846C12.9197 17.3846 13.5067 17.6277 13.9395 18.0605C14.3723 18.4933 14.6154 19.0803 14.6154 19.6923ZM14.6154 12C14.6154 12.612 14.3723 13.199 13.9395 13.6318C13.5067 14.0646 12.9197 14.3077 12.3077 14.3077C11.6957 14.3077 11.1087 14.0646 10.6759 13.6318C10.2431 13.199 10 12.612 10 12C10 11.388 10.2431 10.801 10.6759 10.3682C11.1087 9.93544 11.6957 9.69231 12.3077 9.69231C12.9197 9.69231 13.5067 9.93544 13.9395 10.3682C14.3723 10.801 14.6154 11.388 14.6154 12ZM14.6154 4.30769C14.6154 4.91973 14.3723 5.5067 13.9395 5.93948C13.5067 6.37225 12.9197 6.61538 12.3077 6.61538C11.6957 6.61538 11.1087 6.37225 10.6759 5.93948C10.2431 5.5067 10 4.91973 10 4.30769C10 3.69565 10.2431 3.10868 10.6759 2.67591C11.1087 2.24313 11.6957 2 12.3077 2C12.9197 2 13.5067 2.24313 13.9395 2.67591C14.3723 3.10868 14.6154 3.69565 14.6154 4.30769Z"/>
									</svg>
								</button>
						</div>
					</header>
					<div className="flex flex-col justify-between h-full">
						<div className="flex flex-col overflow-y-auto pb-14 h-full" ref={messagesRef}>
							{renderMessages()}
						</div>
						<MessageInput recipientId={recipientId}/>
					</div>
				</div>
		)
}

export default Chat