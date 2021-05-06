const checkUserAndPass = (email: string, password: string): string[] => {
	let errors: string[] = []
	if (!email || !email.includes("@")) {
		errors.push("You must enter a valid email")
	}
	if (!password || password.length < 7) {
		errors.push("Your password must be at least 8 characters long")
	}
	if (password.search(/[a-z]/) === -1) {
		errors.push("Your password must contain at least 1 lower case character")
	}
	if (password.search(/[A-Z]/) === -1) {
		errors.push("Your password must contain at least 1 upper case character")
	}
	if (password.search(/[0-9]/) === -1) {
		errors.push("Your password must contain at least 1 number")
	}

	if (password.search(/[! | @ | # | $ | % | ^ | & | * | ( | )]/) === -1) {
		errors.push(
			"Your password must contain at least 1: !, @, #, $, %, ^, &, *, (, )",
		)
	}
	return errors
}
export default checkUserAndPass
