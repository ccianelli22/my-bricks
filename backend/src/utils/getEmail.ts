import jwt from "jsonwebtoken"

// function to extract the email from the token
const getEmail = (token: string) => {
	const email = jwt.decode(token)
	if (typeof email === "object") {
		if (email!["email"] !== null) {
			return email!["email"]
		}
	} else return ""
}

export default getEmail
