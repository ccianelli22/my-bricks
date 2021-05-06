import React from "react"
import StyledInput from "./StyledInput"

interface Props {
	email: string

	handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void

	password: string

	handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void

	handlePressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const EmailForm: React.FC<Props> = ({
	email,
	handleEmailChange,
	password,
	handlePasswordChange,
	handlePressEnter,
}) => (
	<>
		<div>
			<StyledInput
				name="email"
				onChangeEvent={handleEmailChange}
				placeholder="Email Address"
				type="email"
				value={email}
			/>
		</div>
		<div>
			<StyledInput
				name="password"
				onChangeEvent={handlePasswordChange}
				onKeyUpEvent={handlePressEnter}
				placeholder="Password"
				type="password"
				value={password}
			/>
		</div>
	</>
)

export default EmailForm
