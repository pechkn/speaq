import {useMemo} from 'react'
import {useAppSelector} from "../store"

const Followers = () => {
	const currentUserId = useAppSelector((state) => state.currentUserId)
	const users = useAppSelector((state) => state.users)
	const followers = useMemo(() => users.filter((user) => user.following.includes(currentUserId)), [currentUserId, users])

	return (
			<>
				{followers
						.map((user) => (
								<div key={user.id}>User {user.id} follows you</div>
						))}
			</>
	)
}

export default Followers