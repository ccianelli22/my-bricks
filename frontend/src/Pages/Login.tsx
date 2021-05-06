import React, { useState } from "react"
import EmailForm from "../Comp/EmailForm"
import checkUserAndPass from "../utils/checkUserAndPass"
import Modal from "../Comp/Modal"
import Portal from "../Comp/Portal"
import StyledButton from "../Comp/StyledButton"
import modalToggle from "../utils/modalToggle"
import Register from "../Comp/Register"
import { IDarkMode } from "../Interfaces/IDarkMode"
import Errors from "../Comp/Errors"
import apiCall from "../utils/apiCall"
import ResetPassword from "../Comp/ResetPassword"

interface Props extends IDarkMode {
	loadDarkMode: () => void
	handleLogIn: () => void
}

const Login: React.FC<Props> = ({
	darkMode,
	handleDarkMode,
	handleLogIn,
	loadDarkMode,
}) => {
	// Set initial State
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [errors, setErrors] = useState<string[]>([])
	const [showModal, setShowModal] = useState<boolean>(false)
	const [showResetPassword, setShowResetPassword] = useState<boolean>(false)
	
	// state is for password resets and registration success
	const [actionSuccess, setActionSuccess] = useState<boolean>(false)
	const [message, setMessage] = useState<string>("")

	// State handlers
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
		setErrors([])
		setShowResetPassword(false)
		setActionSuccess(false)
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
		setErrors([])
		setShowResetPassword(false)
		setActionSuccess(false)
	}

	const handleShowModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		setErrors([])
		setActionSuccess(false)
		modalToggle(e.currentTarget.value)
		setTimeout(() => {
			setShowModal((prevVal) => !prevVal)
		})
	}

	const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		modalToggle(e.currentTarget.value)
		setTimeout(() => {
			setShowModal((prevVal) => !prevVal)
		})
	}

	const handleSubmit = (
		e:
			| React.MouseEvent<HTMLButtonElement>
			| React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.type === "keyup") {
			if (e["key"] === "Enter") {
				logon()
			}
		} else if (e.type === "click") {
			logon()
		}
	}

	const logon = async () => {
		let _errs = checkUserAndPass(email, password)
		setErrors(_errs)

		if (_errs.length === 0) {
			const response = await apiCall("login", "POST", {
				email,
				password,
			})
			switch (response.status) {
				case 200:
					localStorage.setItem(
						"mybricks-payload",
						response.data.token,
					)

					localStorage.setItem(
						"mybricks-darkMode",
						response.data.darkMode,
					)

					loadDarkMode()
					handleLogIn()
					break
				case 400:
					setErrors([response.data.msg])
					break
				case 404:
					setErrors([response.data.msg])
					setShowResetPassword(true)
					break
				default:
					setErrors([
						"An error has occured please try again later.",
					])
			}
		}
	}

	const handleRegSuccess = (modalID: string) => {
		setMessage("You have successfully registered, please login.")
		onActionSuccess(modalID)
	}
	const handleResetSuccess = (modalID: string) => {
		setShowResetPassword(false)
		setMessage("You have successfully reset your password, please login.")
		onActionSuccess(modalID)
	}

	const onActionSuccess = (modalID: string) => {
		setActionSuccess(true)
		modalToggle(modalID)
		setEmail("")
		setPassword("")
		setTimeout(() => {
			setShowModal((prevVal) => !prevVal)
		})
	}
	return (
		<div className="container h-screen mx-auto">
			<div className="grid grid-cols-2 xs:pt-20 sm:pt-32 lg:pt-44">
				<div className="flex flex-col items-center text-2xl">
					<h3 className="font-semibold text-red-900 dark:text-dracula-purple">
						My Bricks
					</h3>
					<p className="text-xl italic">
						Toss those bricks you're carrying
					</p>
				</div>
				<div className="flex flex-col items-center">
					<EmailForm
						email={email}
						handleEmailChange={handleEmailChange}
						password={password}
						handlePasswordChange={
							handlePasswordChange
						}
						handlePressEnter={handleSubmit}
					/>
					<div className="flex flex-row items-baseline justify-around">
						<StyledButton
							darkColor="dracula-purple"
							darkAltColor="dracula-foreground"
							lightColor="red-900"
							lightAltColor="gray-100"
							handleOnClick={handleSubmit}
							size="xl"
							text="Login"
						/>
						<StyledButton
							darkColor="dracula-green"
							darkAltColor="dracula-foreground"
							lightColor="green-600"
							lightAltColor="gray-100"
							handleOnClick={handleShowModal}
							size="xl"
							text="Register"
							value="registerModal"
						/>
					</div>

					{showResetPassword && (
						<StyledButton
							darkColor="dracula-red"
							darkAltColor="dracula-foreground"
							lightColor="red-600"
							lightAltColor="gray-100"
							handleOnClick={handleShowModal}
							size="xl"
							text="Reset Password"
							value="resetPasswordModal"
						/>
					)}
					{errors && <Errors errors={errors} />}
				</div>

				<Portal>
					<Modal
						id="registerModal"
						header="Registration"
						onClose={handleCloseModal}
					>
						<Register
							darkMode={darkMode}
							handleDarkMode={handleDarkMode}
							onRegister={handleRegSuccess}
						/>
					</Modal>
				</Portal>
				<Portal>
					<Modal
						id="resetPasswordModal"
						header="Reset Password"
						onClose={handleCloseModal}
					>
						<ResetPassword
							email={email}
							onReset={handleResetSuccess}
						/>
					</Modal>
				</Portal>
			</div>
			{actionSuccess && (
				<div className="pt-4 text-center">
					<p className="text-sm italic text-green-500 dark:text-dracula-green">
						{message}
					</p>
				</div>
			)}
		</div>
	)
}

export default Login
