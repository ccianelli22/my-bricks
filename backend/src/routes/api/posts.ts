import express, { Request, Response } from "express"
import { Db, ObjectID } from "mongodb"
import IPost from "../../../../common/interfaces/IPost"
import getEmail from "../../utils/getEmail"
import isAuthenticated from "../../middleware/isAuthenticated"
const router = express.Router()

router.use(isAuthenticated)
// Get posts from all users
router.get("/", async (request: Request, response: Response) => {
	const mongoDB: Db = request.app.locals.mongoDB
	const collection = mongoDB.collection("posts")
	try {
		const query = { isHidden: false }
		const projection = { author: 0 }
		const sorter = { datePosted: -1 }
		const limit = 30
		const result = await collection
			.find(query)
			.project(projection)
			.sort(sorter)
			.limit(limit)
			.toArray()
		if (result) {
			response.status(200).json(result)
		} else {
			response.sendStatus(204)
		}
	} catch (e) {
		console.log(e.stack)
		response.sendStatus(500)
	}
})

// post new brick post
router.post("/", async (request: Request, response: Response) => {
	const data: IPost = request.body
	const { category, isHidden, post } = data

	const token = request.signedCookies.token
	const email = getEmail(token)
	if (email !== "") {
		let mongoDB: Db = request.app.locals.mongoDB
		const collection = mongoDB.collection("posts")
		const data = {
			category,
			isHidden,
			post,
			author: email,
			datePosted: Date.now(),
			encourageNum: 0,
		}
		try {
			const result = await collection.insertOne(data)
			if (result) {
				response.sendStatus(200)
			}
		} catch (e) {
			response.sendStatus(500)
		}
	} else {
		response.sendStatus(500)
	}
})

// route is specific to increment the encourage button
router.post("/:id", async (request: Request, response: Response) => {
	const data: IPost = request.body
	const { _id } = data

	let mongoDB: Db = request.app.locals.mongoDB
	const collection = mongoDB.collection("posts")
	const query = {
		_id: new ObjectID(_id),
	}
	const updateQuery = { $inc: { encourageNum: 1 } }
	try {
		const result = await collection.updateOne(query, updateQuery)
		if (result) {
			response.sendStatus(200)
		}
	} catch (e) {
		response.sendStatus(500)
	}
})

export default router
