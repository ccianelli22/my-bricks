// Just a page that lists help numbers and information.
import React from "react"
import { withRouter } from "react-router-dom"
import _categories from "../Categories/categories"

const GetHelp: React.FC = () => {
	const categories = _categories.filter((category) => {
		return category
			? category.phoneNumber?.length || category.website?.length
			: null
	})
	return (
		<div className="my-5">
			<div className="grid grid-cols-1 space-y-5 justify-items-center">
				{categories.map((category) => (
					<div className="flex flex-col place-items-center">
						<h4 className="text-2xl italic font-semibold text-gray-700 dark:text-dracula-orange">
							{category.categoryName.toUpperCase()}
						</h4>
						<ul className="">
							{category.phoneNumber ? (
								<li className="my-1">
									{` ${category.phoneNumber}`}
								</li>
							) : null}
							{category.website ? (
								<li className="my-1">
									<a
										className="hover:text-blue-800 dark:hover:text-dracula-cyan hover:font-medium hover:underline"
										href={
											category.website
										}
										rel="noreferrer"
										target="_blank"
									>
										Click here
										for help
									</a>
								</li>
							) : null}
						</ul>
					</div>
				))}
			</div>
		</div>
	)
}
export default withRouter(GetHelp)
