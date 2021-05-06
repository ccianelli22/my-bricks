import React, { useState, useEffect } from "react"
import IPost from "../../../common/interfaces/IPost"
import PostCardInfo from "../Comp/BrickPosts/PostCardInfo"
import Loading from "../Comp/Loading"
import apiCall from "../utils/apiCall"

interface Props {
	toRefresh: boolean
}

const Home: React.FC<Props> = ({ toRefresh }) => {
	let [posts, setPosts] = useState<IPost[]>([])
	let [isLoading, setIsLoading] = useState<boolean>(true)

	// Once the api call is finished isloading is set to false and the posts will be rendered
	useEffect(() => {
		// Get all posts by user
		const getPosts = async () => {
			try {
				let results = await apiCall("posts", "GET")
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
export default Home
