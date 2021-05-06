import express, { Request, Response } from "express"
import { Db, ObjectID } from "mongodb"
import getEmail from "../../utils/getEmail"
import isAuthenticated from "../../middleware/isAuthenticated"
const router = express.Router()

router.use(isAuthenticated)
// Get posts from all users
router.get("/", async (request: Request, response: Response) => {
	const email = getEmail(request.signedCookies.token)
	const mongoDB: Db = request.app.locals.mongoDB
	const collection = mongoDB.collection("posts")
	const query = { author: email }
	const sorter = { datePosted: -1 }
	try {
		const result = await collection.find(query).sort(sorter).toArray()
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

// delete brick post

router.delete("/:id", async (request: Request, response: Response) => {
	const { id } = request.params
	let mongoDB: Db = request.app.locals.mongoDB
	const collection = mongoDB.collection("posts")
	const query = { _id: new ObjectID(id) }
	try {
		const result = await collection.deleteOne(query)
		if (result) {
			response.sendStatus(200)
		}
	} catch (e) {
		response.sendStatus(500)
	}
})

export default router
