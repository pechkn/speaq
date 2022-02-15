import {createUser, setCurrentUser, useAppDispatch, useAppSelector} from "../store";
import React, {useState} from "react";
import {EmailInput} from "./EmailInput";
import Link from 'next/link'

export const SignupForm = () => {
	const users = useAppSelector((state) => state.users)
	const dispatch = useAppDispatch()
	const [email, setEmail] = useState('')
	const [isEmailChanged, setEmailChanged] = useState(false)
	const [isEmailValid, setEmailValid] = useState(false)

	const signup = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!users.find((user) => user.name === email)) {
			dispatch(createUser(email))
			dispatch(setCurrentUser(email))
		}
	}

	return (
			<div className="flex flex-col">
				<form className="flex flex-col" onSubmit={signup}>
					<EmailInput email={email} setEmail={setEmail} isEmailValid={isEmailValid} setEmailValid={setEmailValid}
											isEmailChanged={isEmailChanged} setEmailChanged={setEmailChanged}/>

					<input
							className='bg-blue-600 text-white rounded-lg px-4 py-2 m-2'
							type="submit"
							value="Sign up free via email"
					/>
				</form>
				<button
						className="leading-tight border-blue-600 border border-solid rounded-lg text-blue-600 px-4 m-2 h-10 flex items-center justify-center">
					<svg className="h-5 text-inherit fill-current mr-2" viewBox="0 0 20 20" fill="none">
						<g className="text-inherit" clipPath="url(#clip0_586_32)">
							<path className="text-inherit"
										d="M19.4312 8.1975C19.5479 8.8687 19.606 9.54875 19.605 10.23C19.605 13.2725 18.5175 15.845 16.625 17.5863H16.6275C14.9725 19.115 12.6975 20 10 20C7.34783 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92894C4.8043 1.05357 7.34783 3.73041e-06 10 3.73041e-06C12.4824 -0.0290692 14.8798 0.903545 16.69 2.6025L13.835 5.4575C12.803 4.47372 11.4256 3.93499 10 3.9575C7.39125 3.9575 5.175 5.7175 4.385 8.0875C3.96613 9.32939 3.96613 10.6744 4.385 11.9163H4.38875C5.1825 14.2825 7.395 16.0425 10.0037 16.0425C11.3512 16.0425 12.5087 15.6975 13.4062 15.0875H13.4025C13.9236 14.7423 14.3694 14.295 14.7129 13.7727C15.0565 13.2505 15.2906 12.664 15.4012 12.0488H10V8.19875H19.4312V8.1975Z"/>
						</g>
						<defs>
							<clipPath id="clip0_586_32">
								<rect width="20" height="20"/>
							</clipPath>
						</defs>
					</svg>
					Sign up free via Google
				</button>
				<p className="m-2 text-neutral-500 leading-tight">By signing up, you agree to the <a className="text-blue-600">privacy policy</a>
				</p>
			</div>
	)
}