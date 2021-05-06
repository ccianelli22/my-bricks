import React from "react"

interface Props {
	errors: string[]
}
const Errors: React.FC<Props> = ({ errors }) => {
	return (
		<ul className="flex flex-col items-baseline pt-2 text-xs text-red-600 list-disc dark:text-dracula-red">
			{errors.map((err: string) => (
				<li className="" key={err}>
					{err}
				</li>
			))}
		</ul>
	)
}
export default Errors
