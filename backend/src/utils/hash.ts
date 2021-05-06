import argon2 from "argon2"
import crypto from "crypto"

export const Hash = {
	hashPassword: async (password: string): Promise<string> => {
		try {
			const hashedPassword = await argon2.hash(password)
			return hashedPassword
		} catch (e) {
			console.log(e)
		}
		return ""
	},

	comparePassword: async (
		inputPassword: string,
		hashedPassword: string,
	): Promise<boolean> => {
		let match = await argon2.verify(hashedPassword, inputPassword)
		return match
	},

	sha256: (password: string): string => {
		return crypto.createHmac("sha256", password).digest("hex")
	},
}
