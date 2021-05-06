import React from "react"
// for simple inputs in login and register forms
interface Props {
	name: string
	placeholder: string
	onChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void
	onKeyUpEvent?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	type: string
	value: string | number
}
const StyledInput: React.FC<Props> = ({
	name,
	placeholder,
	onChangeEvent,
	onKeyUpEvent,
	type,
	value,
}) => {
	return (
		<input
			className="pl-4 mb-4 border-2 rounded-lg outline-none hover:bg-blue-100 dark:hover:bg-dracula-comment dark:bg-dracula-background dark:border-dracula-foreground"
			name={name}
			onChange={onChangeEvent}
			onKeyUp={onKeyUpEvent}
			placeholder={placeholder}
			type={type}
			value={value}
		/>
	)
}
export default StyledInput
