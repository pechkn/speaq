import {useMemo} from 'react'
import {useAppSelector} from "../store"

const Following = () => {
	const currentUserId = useAppSelector((state) => state.currentUserId)
	const users = useAppSelector((state) => state.users)
	const following = useMemo(() => users.filter((user) => users[currentUserId].following.includes(user.id)), [currentUserId, users])

	return (
			<>
				{following
						.map((user) => (
								<div key={user.id}>Following user {user.id}</div>
						))}
			</>
	)
}

export default Following