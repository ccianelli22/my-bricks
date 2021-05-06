import React from "react"

interface Props {
	id: string
	header: string
	onClose: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const Modal: React.FC<Props> = ({ id, header, onClose, children }) => {
	return (
		<div
			className="container fixed inset-x-0 top-0 invisible w-1/2 mx-auto my-12 overflow-auto transition-all duration-1000 bg-gray-100 border-2 border-gray-300 border-solid opacity-0 dark:bg-dracula-background"
			id={id}
		>
			<div className="flex py-2 text-gray-100 bg-red-900 dark:bg-dracula-selection dark:text-dracula-pink">
				<h1 className="flex-1 text-2xl text-center">{header}</h1>
				<button
					className="self-start float-right mx-2 text-2xl transition duration-200 ease-in-out rounded-full hover:text-red-900 "
					onClick={onClose}
					type="button"
					value={id}
				>
					X
				</button>
			</div>

			<div className="m-4 text-sm">{children}</div>
		</div>
	)
}
export default Modal
