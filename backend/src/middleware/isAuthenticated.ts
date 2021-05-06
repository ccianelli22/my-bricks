import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
// Middleware to ensure you are logged in with an active token
const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
	if (request.url === "/api/login" || request.url === "/api/register") {
		next()
	} else {
		const token: string = request.signedCookies.token
		jwt.verify(token, process.env.SECRETCOOKIE!, (err, decode) => {
			decode
			if (err) {
				if (err.message) {
					//WHEN THIS IS RECEIVED BY THE CLIENT, THE CLIENT WILL BE LOGGED OUT
					response.clearCookie("token").sendStatus(401)
				}
			} else {
				next()
			}
		})
	}
}

export default isAuthenticated
