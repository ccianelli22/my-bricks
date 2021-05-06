import React from "react"
import { IDarkMode } from "../../Interfaces/IDarkMode"
import apiCall from "../../utils/apiCall"

interface Props extends IDarkMode {
	url: string
}

// Button to enable/disable darkmode
const DarkModeToggle: React.FC<Props> = ({ darkMode, handleDarkMode, url }) => {
	const saveDarkModeTheme = async (e: React.MouseEvent<HTMLInputElement>) => {
		if (url !== "register") {
			const email = localStorage.getItem("mybricks-email")
			if (email) {
				const response = await apiCall("enabledarkmode", "POST", {
					email,
					darkMode: !darkMode,
				})

				if (response.status === 200) {
					localStorage.setItem(
						"mybricks-darkMode",
						`${!darkMode}`,
					)
				} else {
					alert(
						"We could not save your dark theme settings at this time.",
					)
				}
			}
		}
	}
	return (
		<div className="relative inline-block w-10 mr-2 align-middle select-none">
			<input
				checked={darkMode}
				className="absolute block w-6 h-6 duration-200 ease-in bg-white border-4 rounded-full outline-none appearance-none cursor-pointer dark:bg-dracula-selection right-4 dark:checked:bg-dracula-pink focus:outline-none checked:right-0 "
				onClick={(e) => {
					saveDarkModeTheme(e)
					handleDarkMode(e)
				}}
				id="toggle"
				type="checkbox"
			/>
			<label
				htmlFor="toggle"
				className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer dark:bg-dracula-selection"
			></label>
		</div>
	)
}
export default DarkModeToggle
