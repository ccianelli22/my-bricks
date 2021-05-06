import express, { Request, Response } from "express"
const router = express.Router()

router.post("/", async (request: Request, response: Response) => {
	response.status(200).clearCookie("token").send()
})

export default router
