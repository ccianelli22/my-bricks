import express, { Request, Response } from "express"
import { Db } from "mongodb"
import isAuthenticated from "../../middleware/isAuthenticated"
const router = express.Router()

router.use(isAuthenticated)
// Get posts search query
router.get("/", async (request: Request, response: Response) => {
	const { searchTerm, category } = request.query
	const mongoDB: Db = request.app.locals.mongoDB
	const collection = mongoDB.collection("posts")

	// Query Variables
	const hiddenQuery = { isHidden: false }
	const textQuery = searchTerm !== "" && { $search: searchTerm }
	// if the category is all then we do not need it in the query
	const categoryQuery = category !== "All" && { category: category }
	const projection = { author: 0 }
	const sorter = { dataPosted: -1 }

	// Entire Query
	// if the searchterm is blank then it is not included in the complete query
	let completeQuery = {}
	if (searchTerm !== "") {
		completeQuery = {
			...hiddenQuery,
			$text: { ...textQuery },
			...categoryQuery,
		}
	} else {
		completeQuery = { ...hiddenQuery, ...categoryQuery }
	}

	// END OF QUERY

	try {
		const result = await collection
			.find(completeQuery)
			.project(projection)
			.sort(sorter)
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

export default router
