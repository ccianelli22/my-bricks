import React, { useState } from "react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import ProfileCard from "./ProfileCard"
import Modal from "../../Comp/Modal"
import Portal from "../../Comp/Portal"
import NewPost from "../BrickPosts/NewPost"
// import brickImg from "./bricks.jpg"
import { IDarkMode } from "../../Interfaces/IDarkMode"

import modalToggle from "../../utils/modalToggle"

interface Props extends IDarkMode {
	logStatus: boolean
	onLogOut: (e: React.MouseEvent) => void
	handleRefreshHome: () => void
}

const Header: React.FC<Props> = ({
	logStatus,
	onLogOut,
	darkMode,
	handleDarkMode,
	handleRefreshHome,
}) => {
	let [buttonIsActive, setButtonIsActive] = useState<boolean>(false)
	const [showModal, setShowModal] = useState<boolean>(false)

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setButtonIsActive(true)
	}

	const closeMenu = (
		e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>,
	) => {
		setButtonIsActive(false)
	}

	const handleShowModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		modalToggle("brick")
		setTimeout(() => {
			setShowModal((prevVal) => !prevVal)
		})
	}

	const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		modalToggle("brick")
		setTimeout(() => {
			setShowModal((prevVal) => !prevVal)
		})
	}
	return (
		<>
			{logStatus && (
				<div
					className="relative py-2 bg-red-900 dark:bg-dracula-selection"
					onMouseLeave={closeMenu}
				>
					<div className="flex items-center justify-between flex-none px-8 text-gray-100 dark:text-dracula-purple">
						<div className="font-semibold sm:text-base lg:text-2xl">
							<Link to="/">My Bricks</Link>
						</div>
						<div>
							<SearchBar />
						</div>

						<div className="font-semibold sm:text-base lg:text-2xl">
							<button onClick={handleShowModal}>
								New Brick
							</button>
						</div>
						<button
							className="font-semibold rounded-full outline-none sm:text-base lg:text-2xl"
							onMouseOver={openMenu}
							type="button"
						>
							Account
						</button>
					</div>
					{buttonIsActive && (
						<ProfileCard
							leave={closeMenu}
							darkMode={darkMode}
							handleDarkMode={handleDarkMode}
							onLogOut={onLogOut}
						/>
					)}
					<Portal>
						<Modal
							id="brick"
							header="New Brick"
							onClose={handleCloseModal}
						>
							<NewPost
								onClose={handleCloseModal}
								handleRefreshHome={
									handleRefreshHome
								}
							/>
						</Modal>
					</Portal>
				</div>
			)}
		</>
	)
}
export default Header
