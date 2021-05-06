import React from "react"
import { Link } from "react-router-dom"

interface Props {
	logStatus: boolean
}
const Foot: React.FC<Props> = ({ logStatus }) => {
	return (
		<div className="absolute flex justify-center w-full h-10 text-xs font-bold text-gray-100 bg-red-900 dark:bg-dracula-selection dark:text-dracula-purple">
			<div className="inset-x-0 bottom-0 flex items-center w-1/2 justify-evenly justify-items-center">
				<p>MIT license</p>
				<Link className="italic" to="/about">
					About My Bricks
				</Link>
				{!logStatus && (
					<Link className="italic" to="/login">
						Login
					</Link>
				)}
			</div>
		</div>
	)
}
export default Foot
