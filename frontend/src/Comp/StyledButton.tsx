import React from "react"

interface Props {
	handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void
	lightColor: string
	lightAltColor: string // Alt color used to change text when
	darkColor: string
	darkAltColor: string // Alt color used to change text when
	size: string
	text: string
	value?: string
}
// Default button since there are so many classes used
const StyledButton: React.FC<Props> = ({
	handleOnClick,
	lightColor,
	lightAltColor,
	darkColor,
	darkAltColor,
	size,
	text,
	value,
}) => (
	<button
		className={`p-2 text-${size} appearance-none text-${lightColor} transition-colors duration-300 border-none rounded-lg outline-none hover:text-${lightAltColor} hover:bg-${lightColor} dark:text-${darkColor} dark:hover:text-${darkAltColor} dark:hover:bg-${darkColor}`}
		onClick={handleOnClick}
		type="button"
		value={value}
	>
		{text}
	</button>
)
export default StyledButton
