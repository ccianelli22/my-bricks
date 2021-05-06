import React, { useState } from "react"
import IPost from "../../../../common/interfaces/IPost"
import PostCardRow from "./PostCardRow"
import StyledButton from "../../Comp/StyledButton"
import convertTimestamp from "../../utils/convertTimestamp"
import apiCall from "../../utils/apiCall"

interface Props {
	post: IPost
	index: number
	handleDelModal?: (e: React.MouseEvent<HTMLButtonElement>) => void
	handleSetPostID?: (_id: number) => void
}

const PostCard: React.FC<Props> = ({ post, index, handleDelModal, handleSetPostID }) => {
	let [encourageNum, setEncourageNum] = useState<number>(post.encourageNum || 0)

	let [encourageClicked, setEncourageClicked] = useState<boolean>(false)

	// if encourage button clicked, change css to disabled with a opacity of 50%
	let encourageButtonStyle = encourageClicked
		? "disabled: opacity-50 cursor-not-allowed"
		: "opacity-100"

	const date = convertTimestamp(post.datePosted)

	const incrementEncourageNum = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const _id = e.currentTarget.value
		if (!encourageClicked) {
			const response = await apiCall(`posts/${_id}`, "POST", { _id })
			if (response.status === 200) {
				setEncourageClicked(true)
				setEncourageNum((prevNum) => prevNum + 1)
			}
		}
	}

	return (
		<div className="relative z-0 flex flex-col items-center py-4 text-white bg-red-900 shadow-xl dark:text-dracula-foreground dark:bg-dracula-selection justify-evenly justify-items-center">
			<div className="container italic text-center">
				<div className="absolute block text-sm">
					<PostCardRow row={date} />
				</div>
				<div className="inline-block text-xl text-center underline uppercase">
					<PostCardRow row={post.category} />
				</div>
				{window.location.pathname === "/mybricks" && (
					<div className="absolute right-0 inline-block float-right mr-2 -mt-4">
						<StyledButton
							darkColor="dracula-red"
							darkAltColor="dracula-foreground"
							lightColor="red-500"
							lightAltColor="gray-100"
							handleOnClick={(e) => {
								handleSetPostID(post._id)
								handleDelModal(e)
							}}
							size="sm"
							text="Delete"
						/>
					</div>
				)}
			</div>
			<div className="text-xl">
				<PostCardRow row={post.post} />
			</div>
			<div>
				<button
					className={`transition-colors duration-200 hover:text-pink-300 border-none appearance-none outline-none  ${encourageButtonStyle}`}
					onClick={incrementEncourageNum}
					type="button"
					value={post._id}
				>
					Encourage{" "}
				</button>
				<span className="ml-2 italic">{encourageNum}</span>
			</div>
		</div>
	)
}
export default PostCard
