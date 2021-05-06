import express, { Request, Response } from "express"
import { Db } from "mongodb"
const router = express.Router()
import { Hash } from "../../utils/hash"

router.post("/", async (request: Request, response: Response) => {
	const { email, password, darkMode, secretKey } = request.body
	let mongoDB: Db = request.app.locals.mongoDB
	const collection = mongoDB.collection("regUsers")
	let result = await collection.findOne({ email })
	if (result) {
		response.status(405).json({
			msg: "The email address is already registered.",
		})
	} else {
		try {
			let hashedPassword = await Hash.hashPassword(password)
			let insert = await collection.insertOne({
				email,
				password: hashedPassword,
				darkMode,
				secretKey,
				created: Date.now(),
			})
			if (insert) {
				response.status(200).json({
					msg: `${email} was successfully registered.`,
				})
			}
		} catch (e) {
			response.sendStatus(500)
		}
	}
})

export default router
