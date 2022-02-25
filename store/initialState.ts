import {State} from "../types"

export const initialState: State = {
	currentUserId: 0,
	users: [
		{
			id: 0,
			email: "god@speaq.chat",
			name: "Vlad Pechkin",
			avatar: "/avatar.jpg",
			following: [1],
			savedMessages: [3, 4],
			messages: [
				{
					id: 0,
					senderId: 0,
					recipientId: 1,
					text: "Hey",
					date: 1643000000000,
				},
				{
					id: 1,
					senderId: 0,
					recipientId: 1,
					text: "How're u?",
					date: 1643100000000,
				},
				{
					id: 2,
					senderId: 0,
					recipientId: 1,
					text: "Is everything ok?",
					date: 1643100100000,
				}
			]
		},
		{
			id: 1,
			name: "Dora",
			email: "dora@example.com",
			avatar: "/dora.jpg",
			following: [0],
			savedMessages: [1],
			messages: [
				{
					id: 3,
					senderId: 1,
					recipientId: 0,
					text: "Sup",
					date: 1643200000000,
				}
			]
		}
	],
	groups: []
}
