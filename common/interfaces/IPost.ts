export default interface IPost {
	_id?: number
	category: string
	post: string
	readonly author?: string
	isHidden: false
	datePosted?: number
	encourageNum?: number
}
