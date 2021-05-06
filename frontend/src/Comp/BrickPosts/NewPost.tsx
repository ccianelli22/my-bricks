import React, { useState } from "react"
import IPost from "../../../../common/interfaces/IPost"
import categories from "../../Categories/categories"
import StyledButton from "../StyledButton"
import apiCall from "../../utils/apiCall"

interface Props {
	onClose: (e: React.MouseEvent<HTMLButtonElement>) => void
	handleRefreshHome: () => void
}

const NewPost: React.FC<Props> = ({ onClose, handleRefreshHome }) => {
	const [postObj, setPostObj] = useState<IPost>({
		category: "life",
		isHidden: false,
		post: "",
	})

	const handlePostUpdate = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target
		let newVal = {}
		if (name === "isHidden") {
			if (value === "true") {
				newVal[name] = true
			} else {
				newVal[name] = false
			}
		} else {
			newVal[name] = value
		}

		setPostObj({ ...postObj, ...newVal })
	}
	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (postObj.post.search(/[a-zA-Z]/) === -1)
			alert("Your post must contain some letters.")
		else {
			const result = await apiCall("posts", "POST", {
				...postObj,
			})
			if (result.status === 200) {
				alert("POSTED")
				setPostObj({
					category: "life",
					isHidden: false,
					post: "",
				})
				onClose(e)
				handleRefreshHome()
			}
		}
	}
	return (
		<div className="flex flex-col overflow-auto h-96 justify-evenly">
			<div className="lg:flex lg:flex-row lg:items-baseline lg:justify-evenly sm:grid sm:space-y-2">
				<div className="py-2">
					<span className="pr-2">
						Hide Brick from Others
					</span>

					<select
						className="px-2 border-2 rounded-lg outline-none hover:bg-blue-100 dark:hover:bg-dracula-comment dark:bg-dracula-background dark:border-dracula-foreground"
						name="isHidden"
						onChange={handlePostUpdate}
						value={postObj.isHidden.toString()}
					>
						<option value="true"> Yes </option>
						<option value="false"> No </option>
					</select>
				</div>
				<div className="py-2">
					<span className="pr-2">Category</span>
					<select
						className="px-2 border-2 rounded-lg outline-none hover:bg-blue-100 dark:hover:bg-dracula-comment dark:bg-dracula-background dark:border-dracula-foreground"
						name="category"
						onChange={handlePostUpdate}
						value={postObj.category}
					>
						{categories.map((category) => (
							<option
								key={
									category.categoryName
								}
							>
								{category.categoryName}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="w-full h-full pt-2 my-4 text-center">
				<div className="container w-full h-full p-2">
					<textarea
						className="container h-full p-3 text-lg border-2 rounded-lg outline-none resize-none hover:bg-blue-100 dark:hover:bg-dracula-comment dark:bg-dracula-background dark:border-dracula-foreground "
						name="post"
						onChange={handlePostUpdate}
						value={postObj.post}
					></textarea>
				</div>
			</div>
			<StyledButton
				darkColor="dracula-purple"
				darkAltColor="dracula-foreground"
				lightColor="red-900"
				lightAltColor="gray-100"
				handleOnClick={handleSubmit}
				size="xl"
				text="Throw Brick"
			/>
		</div>
	)
}
export default NewPost
