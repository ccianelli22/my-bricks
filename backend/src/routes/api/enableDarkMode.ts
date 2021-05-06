import express, { Request, Response } from "express"
import { Db } from "mongodb"
import isAuthenticated from "../../middleware/isAuthenticated"
const router = express.Router()

router.use(isAuthenticated)

router.post("/", async (request: Request, response: Response) => {
	const { email, darkMode } = request.body
	let mongoDB: Db = request.app.locals.mongoDB
	const collection = mongoDB.collection("regUsers")
	let result: any[] = await collection.findOne({ email })
	if (result) {
		let update = await collection.updateOne(
			{ email: email },
			{ $set: { darkMode: darkMode } },
		)
		if (update) response.sendStatus(200)
	} else response.sendStatus(500)
})
export default router
