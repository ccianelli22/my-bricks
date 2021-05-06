import React from "react"
import { Link } from "react-router-dom"
import DarkModeToggle from "./DarkModeToggle"
import { IDarkMode } from "../../Interfaces/IDarkMode"

interface Props extends IDarkMode {
	leave: (
		e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>,
	) => void
	onLogOut: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const ProfileCard: React.FC<Props> = ({ leave, darkMode, onLogOut, handleDarkMode }) => (
	<div
		className="fixed right-0 z-50 inline-block px-2 my-2 mr-1 bg-gray-100 border-2 border-solid dark:bg-dracula-background sm:text-sm lg:text-base dark:border-dracula-selection"
		onMouseLeave={leave}
	>
		<ul className="grid-cols-1 space-y-2 text-center divide-y-2 divide-solid justify-items-center">
			<li>
				<Link
					className="transition-colors duration-200 hover:underline hover:text-blue-600 dark:hover:text-dracula-green"
					to="/mybricks"
				>
					My Bricks
				</Link>
			</li>
			<li>
				<Link
					className="transition-colors duration-200 hover:underline hover:text-blue-600 dark:hover:text-dracula-green"
					to="/gethelp"
				>
					Get Help
				</Link>
			</li>
			<li>
				<div className="flex">
					<div>
						<span>Dark Mode</span>
					</div>
					<div className="ml-1">
						<DarkModeToggle
							darkMode={darkMode}
							handleDarkMode={handleDarkMode}
							url={""}
						/>
					</div>
				</div>
			</li>
			<li>
				<button
					className="text-red-600 outline-none dark:text-dracula-red"
					onClick={onLogOut}
				>
					Log Out
				</button>
			</li>
		</ul>
	</div>
)

export default ProfileCard
