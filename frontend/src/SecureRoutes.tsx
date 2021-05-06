import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import GetHelp from "./Pages/GetHelp"
import SearchResults from "./Pages/SearchResults"
import Page404 from "./Pages/Page404"
import Home from "./Pages/Home"
import MyBricks from "./Pages/MyBricks"

interface Props {
	toRefresh: boolean
}

const Routes: React.FC<Props> = ({ toRefresh }) => (
	<Switch>
		<Route exact path="/login">
			<Redirect push to="/" />
		</Route>

		<Route exact path="/">
			<Home toRefresh={toRefresh} />
		</Route>

		<Route exact path="/gethelp">
			<GetHelp />
		</Route>
		<Route exact path="/mybricks">
			<MyBricks toRefresh={toRefresh} />
		</Route>
		<Route path="/searchResults">
			<SearchResults />
		</Route>
		<Route exact path="/*">
			<Page404 />
		</Route>
	</Switch>
)

export default Routes
