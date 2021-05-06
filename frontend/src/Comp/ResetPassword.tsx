import React, { useState } from "react"
import StyledButton from "./StyledButton"
import checkUserAndPass from "../utils/checkUserAndPass"
import StyledInput from "./StyledInput"
import Errors from "./Errors"
import apiCall from "../utils/apiCall"

interface Props {
	email: string
	onReset: (_id: string) => void
}
const ResetPassword: React.FC<Props> = ({ email, onReset }) => {
	// Set initial State
	const [password, setPassword] = useState<string>("")
	const [secretKey, setSecretKey] = useState<string>("")
	const [errors, setErrors] = useState<string[]>([])

	// State handlers
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value)
		setErrors([])
	}
	const handleSecretKeyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSecretKey(e.target.value)
	}

	const handleResetPassword = (
		e:
			| React.MouseEvent<HTMLButtonElement>
			| React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.type === "keyup") {
			if (e["key"] === "Enter") {
				resetPassword("resetPasswordModal")
			}
		} else if (e.type === "click") {
			resetPassword("resetPasswordModal")
		}
	}

	const resetPassword = async (modalID: string) => {
		let _errs = checkUserAndPass(email, password)
		if (secretKey.length < 5)
			_errs.push("Your secret key must be at least 5 characters")
		setErrors(_errs)

		if (_errs.length === 0) {
			const response = await apiCall("resetpassword", "POST", {
				email,
				secretKey,
				password,
			})

			switch (response.status) {
				case 200:
					onReset(modalID)
					break
				default:
					setErrors([response.data.msg])
			}
		}
	}

	return (
		<div className="flex flex-col items-center justify-between justify-items-center">
			<div className="flex flex-col items-center justify-between text-lg justify-items-center">
				<p className="italic font-semibold">Email: {email}</p>
				<p className="py-2 italic font-semibold">
					Please enter your Secret Key
				</p>
				<StyledInput
					name="secretKey"
					onChangeEvent={handleSecretKeyChange}
					placeholder="Secret Key"
					type="text"
					value={secretKey}
				/>
				<p className="py-2 italic font-semibold">
					Please enter your new Password
				</p>
				<StyledInput
					name="password"
					onChangeEvent={handlePasswordChange}
					onKeyUpEvent={handleResetPassword}
					placeholder="Password"
					type="password"
					value={password}
				/>

				<StyledButton
					darkColor="dracula-purple"
					darkAltColor="dracula-foreground"
					lightColor="red-900"
					lightAltColor="gray-100"
					handleOnClick={handleResetPassword}
					size="xl"
					text="Reset Password"
					value="resetPasswordModal"
				/>
				{errors && <Errors errors={errors} />}
			</div>
		</div>
	)
}

export default ResetPassword
