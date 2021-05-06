import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import Header from "./Comp/Header/Header"
import Foot from "./Comp/Foot"
import Login from "./Pages/Login"
import About from "./Pages/About"
import SecureRoutes from "./SecureRoutes"
import isDarkModeEnabled from "./utils/isDarkModeEnabled"
import apiCall from "./utils/apiCall"

const App = () => {
	const payload = localStorage.getItem("mybricks-payload")

	const authenticated = payload ? true : false

	// Function to check if the Timer in payload is valid??

	const [logStatus, setLogStatus] = useState<boolean>(authenticated)

	// sets the initial dark mode to true or false

	const [darkMode, setDarkMode] = useState<boolean>(isDarkModeEnabled())

	// Refresh if page is on home and new post is created
	const [refreshHome, setRefreshHome] = useState<boolean>(false)

	useEffect(() => {
		if (darkMode === true) {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	}, [darkMode])

	// Button toggle enables or disables dark mode
	const handleDarkMode = (e: React.MouseEvent) => {
		setDarkMode((prevMode) => !prevMode)
	}

	// function sent to the login component which will set
	const loadDarkMode = () => {
		setDarkMode(isDarkModeEnabled())
	}

	const handleLogIn = () => {
		if (localStorage.getItem("mybricks-payload")) {
			setLogStatus(true)
		}
	}
	const onLogOut = async () => {
		const response = await apiCall("logout", "POST")
		if (response.status === 200) {
			setLogStatus(false)
			localStorage.removeItem("mybricks-payload")
			localStorage.removeItem("mybricks-darkMode")
			// reset dark theme settings to system settings
			setDarkMode(isDarkModeEnabled())
		}
	}
	// function to internally update when a post is created or deleted.
	const handleRefreshHome = () => {
		setRefreshHome(true)
		setTimeout(() => {
			setRefreshHome(false)
		}, 5000)
	}

	return (
		<Router>
			<Header
				logStatus={logStatus}
				onLogOut={onLogOut}
				darkMode={darkMode}
				handleDarkMode={handleDarkMode}
				handleRefreshHome={handleRefreshHome}
			/>
			<Switch>
				<Route exact path="/about">
					<About />
				</Route>
				<Route>
					{logStatus ? (
						<SecureRoutes toRefresh={refreshHome} />
					) : (
						<Route>
							<Login
								darkMode={darkMode}
								handleDarkMode={
									handleDarkMode
								}
								handleLogIn={handleLogIn}
								loadDarkMode={
									loadDarkMode
								}
							/>
							<Redirect push to="/login" />
						</Route>
					)}
				</Route>
			</Switch>
			<Foot logStatus={logStatus} />
		</Router>
	)
}

export default App
