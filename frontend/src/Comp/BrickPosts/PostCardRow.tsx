import React from "react"

interface Props {
	row: String
}

const PostCardRow: React.FC<Props> = ({ row }) => {
	return (
		<div className="px-6 py-2">
			<p>{row}</p>
		</div>
	)
}

export default PostCardRow
