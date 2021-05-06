import React, { useState, useEffect } from "react"
import Loading from "../Comp/Loading"
import PostCardInfo from "../Comp/BrickPosts/PostCardInfo"
import apiCall from "../utils/apiCall"
import IPost from "../../../common/interfaces/IPost"

interface Props {
	toRefresh: boolean
}
const MyBricks: React.FC<Props> = ({ toRefresh }) => {
	let [posts, setPosts] = useState<IPost[]>([])
	let [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		// Get all posts by user
		const getPosts = async () => {
			try {
				let results = await apiCall("myposts", "GET")
				if (results.status === 200) {
					setPosts(results.data)
					setIsLoading(false)
				}
			} catch (e) {
				console.log(e)
			}
		}
		getPosts()
	}, [toRefresh])

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				posts.length > 0 && <PostCardInfo posts={posts} />
			)}
		</>
	)
}
export default MyBricks
