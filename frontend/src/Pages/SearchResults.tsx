import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import Loading from "../Comp/Loading"
import PostCardInfo from "../Comp/BrickPosts/PostCardInfo"
import IPost from "../../../common/interfaces/IPost"
import apiCall from "../utils/apiCall"

interface Props {
	location: any
}

const SearchResults: React.FC<Props> = (Props) => {
	const [isLoading, setIsLoading] = useState(true)
	const [results, setResults] = useState<IPost[]>([])
	let searchbarVal = `Searched: ${Props.location.state[0]}`
	let filterVal = `Filter: ${Props.location.state[1]}`

	// Once api call is finished, isloading set to false and the posts will be rendered
	React.useEffect(() => {
		const getSearchResults = async () => {
			const search = window.location.search
			const results = await apiCall(`searchResults/${search}`, "GET")
			switch (results.status) {
				case 200:
					setResults(results.data)
					setIsLoading(false)
					break
				default:
					setIsLoading(false)
			}
		}
		getSearchResults()
	}, [searchbarVal, filterVal])

	return (
		<div className="flex flex-col m-4 text-center">
			<div className="flex-1 text-xl font-semibold">
				<h3>{"Your results for:"}</h3>
				<p className="italic">{searchbarVal}</p>
				<p className="italic">{filterVal}</p>
			</div>
			{isLoading ? (
				<Loading />
			) : results.length === 0 ? (
				<p>Your search had no results</p>
			) : (
				<PostCardInfo posts={results} />
			)}
		</div>
	)
}

export default withRouter(SearchResults)
