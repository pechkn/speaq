import {FC, useState} from "react";
import {EmailInput} from "./EmailInput";

interface Props {
	enteredEmail: string
	isResending: boolean
}

export const ConfirmEmail: FC<Props> = ({enteredEmail, isResending}) => {
	const [email, setEmail] = useState(enteredEmail)
	const [isEmailChanged, setEmailChanged] = useState(false)
	const [isEmailValid, setEmailValid] = useState(false)

	return (
			<div className="flex flex-col">
				<h1 className="text-xl font-bold leading-tight m-2">{isResending ? 'Resend verification link' : 'Check your email'}</h1>
				{isResending ?
						<>
							<p className="m-2 leading-tight">Enter the email on which you want to get the link</p>
							<EmailInput email={email} setEmail={setEmail} isEmailChanged={isEmailChanged} setEmailChanged={setEmailChanged} isEmailValid={isEmailValid} setEmailValid={setEmailValid} />
							<input
									className='bg-blue-600 text-white rounded-lg px-4 py-2 m-2'
									type="submit"
									value="Resend link"
							/>
						</> :
						<><p className="m-2 leading-tight">Click the verification link which is sent to
							<strong>{email}</strong></p>
					<a className='bg-blue-600 text-white rounded-lg px-4 py-2 m-2 flex justify-center'
					>Open email
					</a>
					<p className="m-2 leading-tight">Didn&apos;t get the link? <a href="" className="text-blue-600">Resend
					it</a>
					</p>
					<p className="m-2 leading-tight">If you still haven’t received link, contact us at <a href=""
					className="text-blue-600">support@speaq.chat</a>.
					</p></>}
			</div>
	)
}