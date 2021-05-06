import React, { useState, useEffect } from "react"
import IPost from "../../../../common/interfaces/IPost"
import PostCard from "./PostCard"
import Portal from "../Portal"
import Modal from "../Modal"
import StyledButton from "../StyledButton"
import modalToggle from "../../utils/modalToggle"
import apiCall from "../../utils/apiCall"

interface Props {
	posts: IPost[]
}

const PostCardInfo: React.FC<Props> = ({ posts }) => {
	const [allPosts, setAllPosts] = useState<IPost[]>(posts)

	const [deletePostID, setDeletePostID] = useState<number>(-1)
	const [showModal, setShowModal] = useState<boolean>(false)

	useEffect(() => {
		setAllPosts(posts)
	}, [posts])
	// function to set the id that is to be deleted
	const handleSetPostID = (_id: number) => {
		setDeletePostID(_id)
	}

	// function to delete the post once the id has been set,
	// if the id === -1 then the id has not been set and the function
	// will exit
	const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (window.location.pathname === "/mybricks" && deletePostID !== -1) {
			const response = await apiCall(
				`myposts/${deletePostID}`,
				"DELETE",
			)
			switch (response.status) {
				case 200:
					const _posts = [...allPosts].filter(
						(_post) => _post._id !== deletePostID,
					)
					setAllPosts(_posts)
					console.log(deletePostID)
					handleCloseModal(e)
					// Reset postID to -1 to ensure the function will not break the app
					setDeletePostID(-1)
					break
				default:
					alert(
						"The post could not be deleted please try again later.",
					)
			}
		}
	}

	const handleShowModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		modalToggle("deletePost")
		setTimeout(() => {
			setShowModal((prevVal) => !prevVal)
		})
	}

	const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		modalToggle("deletePost")
		setTimeout(() => {
			setShowModal((prevVal) => !prevVal)
		})
	}

	return (
		<div className="grid w-3/4 grid-cols-1 py-5 mx-auto rounded-lg gap-y-5">
			{allPosts.map((post, index) => (
				<div key={post._id}>
					<PostCard
						post={post}
						index={index}
						handleDelModal={handleShowModal}
						handleSetPostID={handleSetPostID}
					/>
				</div>
			))}
			<Portal>
				<Modal
					id="deletePost"
					header="Delete Post"
					onClose={handleCloseModal}
				>
					<div className="container mx-auto text-center">
						<p className="py-2 text-lg italic font-semibold">
							Are you sure you want to delete
							this post? This action cannot be
							undone!
						</p>
						<StyledButton
							darkColor="dracula-red"
							darkAltColor="dracula-foreground"
							lightColor="red-500"
							lightAltColor="gray-100"
							handleOnClick={handleDeletePost}
							size="lg"
							text="Yes"
						/>
						<StyledButton
							darkColor="dracula-green"
							darkAltColor="dracula-foreground"
							lightColor="green-500"
							lightAltColor="gray-100"
							handleOnClick={handleCloseModal}
							size="lg"
							text="No"
						/>
					</div>
				</Modal>
			</Portal>
		</div>
	)
}

export default PostCardInfo
