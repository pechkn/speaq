import {FC} from "react";

interface Props {
	email: string
	setEmail: (value: string) => void
	isEmailChanged: boolean
	setEmailChanged: (value: boolean) => void
	isEmailValid: boolean
	setEmailValid: (value: boolean) => void
}

export const EmailInput: FC<Props> = ({email, setEmail, isEmailChanged, setEmailChanged, isEmailValid, setEmailValid}) => {

	const validate = (email: string) => {
		setEmailValid(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
	}

	return (
			<>
				<input
						className='h-10 bg-neutral-200 rounded-lg px-4 m-2 h-10 leading-tight'
						type="email" placeholder="Enter email, e.g. mail@example.com"
						value={email}
						onChange={({target}) => {
							setEmail(target.value)
							validate(target.value)
						}}
						onBlur={({target}) => {
							validate(target.value)
							setEmailChanged(true)
						}}
				/>
				{(isEmailChanged && !isEmailValid) && <p className="mx-2 text-red-600 flex items-center">
					<svg className="text-inherit fill-current h-5 mr-2" viewBox="0 0 16 16">
						<path className="text-inherit"
									d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
						<path className="text-inherit"
									d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
						/>
					</svg>
					Wrong email address
				</p>}
			</>
	)
}