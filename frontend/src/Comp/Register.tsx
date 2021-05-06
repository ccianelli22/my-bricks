import React, { useState } from "react"
import EmailForm from "./EmailForm"
import StyledButton from "./StyledButton"
import checkUserAndPass from "../utils/checkUserAndPass"
import DarkModeToggle from "./Header/DarkModeToggle"
import { IDarkMode } from "../Interfaces/IDarkMode"
import StyledInput from "./StyledInput"
import Errors from "./Errors"
import apiCall from "../utils/apiCall"

interface Props extends IDarkMode {
	onRegister: (_id: string) => void
}
const Register: React.FC<Props> = ({ onRegister, darkMode, handleDarkMode }) => {
	// Set initial State
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [secretKey, setSecretKey] = useState<string>("")
	const [errors, setErrors] = useState<string[]>([])

	// State handlers
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value)
		setErrors([])
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value)
		setErrors([])
	}
	const handleSecretKeyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSecretKey(e.target.value)
	}

	const handleRegister = (
		e:
			| React.MouseEvent<HTMLButtonElement>
			| React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.type === "keyup") {
			if (e["key"] === "Enter") {
				register("registerModal")
			}
		} else if (e.type === "click") {
			register("registerModal")
		}
	}

	const register = async (modalID: string) => {
		let _errs = checkUserAndPass(email, password)
		if (secretKey.length < 5)
			_errs.push("Your secret key must be at least 5 characters")
		setErrors(_errs)

		if (_errs.length === 0) {
			const response = await apiCall("register", "POST", {
				email,
				password,
				darkMode,
				secretKey,
			})
			switch (response.status) {
				case 200:
					setEmail("")
					setPassword("")
					setSecretKey("")
					onRegister(modalID)
					break
				default:
					setErrors([response.data.msg])
			}
		}
	}

	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col items-center justify-between justify-items-center">
				<EmailForm
					email={email}
					handleEmailChange={handleEmailChange}
					password={password}
					handlePasswordChange={handlePasswordChange}
				/>
				<div className="block mb-4">
					<label>
						Dark Mode:
						<span className="pr-2"></span>
						<DarkModeToggle
							darkMode={darkMode}
							handleDarkMode={handleDarkMode}
							url="Register"
						/>
					</label>
				</div>

				<StyledInput
					name="secretKey"
					onChangeEvent={handleSecretKeyChange}
					onKeyUpEvent={handleRegister}
					placeholder="Secret Key"
					type="text"
					value={secretKey}
				/>

				<StyledButton
					darkColor="dracula-purple"
					darkAltColor="dracula-foreground"
					lightColor="red-900"
					lightAltColor="gray-100"
					handleOnClick={handleRegister}
					size="xl"
					text="Register"
				/>
				{errors && <Errors errors={errors} />}
			</div>
		</div>
	)
}

export default Register
