import express, { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Db } from "mongodb"
import { Hash } from "../../utils/hash"
const router = express.Router()

router.post("/", async (request: Request, response: Response) => {
	const { email, password } = request.body
	const mongoDB: Db = request.app.locals.mongoDB
	const collection = mongoDB.collection("regUsers")
	const query = { email }
	const updateQuery = { $set: { lastLogin: Date.now() } }
	try {
		const result = await collection.findOne(query)
		if (!result) {
			response.status(404).json({
				msg: `${email} does not exist, please register this user.`,
			})
		} else {
			const { _id, email, darkMode } = result
			await collection.updateOne(query, updateQuery)
			const cookieOptions = {
				httpOnly: true,
				sameSite: true,
				signed: true,
			}
			const isMatch = await Hash.comparePassword(
				password,
				result.password,
			)
			if (isMatch) {
				try {
					const token = await jwt.sign(
						{ _id, email },
						process.env.SECRETCOOKIE!,
						{
							expiresIn: "1h",
						},
					)
					response.status(200)
						.cookie("token", token, cookieOptions)
						.status(200)
						.json({
							token,
							darkMode,
						})
				} catch (e) {
					console.log(e)
				}
			} else {
				response.status(404).json({
					msg: "Password does not match, please try again",
				})
			}
		}
	} catch (e) {
		console.log(e)
	}
})

export default router
