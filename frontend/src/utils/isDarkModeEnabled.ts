// If user enabled Dark Mode during registration or toggles the
// button when logged in or if their system setting theme is dark
// mode then darkModeEnabled will be true
const darkModeEnabled = (): boolean => {
	const darkMode = localStorage.getItem("mybricks-darkMode")
	if (darkMode === "false") return false
	else if (
		darkMode === "true" ||
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		return true
	} else return false
}

export default darkModeEnabled
