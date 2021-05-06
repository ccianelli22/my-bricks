import express, { Request, Response } from "express"
import { Db } from "mongodb"
const router = express.Router()
import { Hash } from "../../utils/hash"

router.post("/", async (request: Request, response: Response) => {
	const { email, password, secretKey } = request.body
	const mongoDB: Db = request.app.locals.mongoDB
	const collection = mongoDB.collection("regUsers")
	const result = await collection.findOne({ email })
	if (result.secretKey === secretKey) {
		try {
			const hashedPassword = await Hash.hashPassword(password)
			const resp = await collection.updateOne(
				{ email },
				{ $set: { password: hashedPassword } },
			)
			if (resp) {
				response.sendStatus(200)
			}
		} catch (e) {
			response.sendStatus(500)
		}
	} else {
		response.status(404).json({
			msg: "The Secret Key you provided does not match.",
		})
	}
})
export default router
