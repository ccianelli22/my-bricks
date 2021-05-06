import axios from "axios"
import { Method } from "axios"
import { AxiosResponse } from "axios"

// default axios function to handle errors better
const apiCall = async (url: string, method: Method, data: object = {}) => {
	let response: AxiosResponse
	const apiURL = `/api/${url}`

	try {
		if (method === "POST") {
			response = await axios.post(apiURL, data)
		} else {
			response = await axios({
				url: apiURL,
				method,
			})
		}
		return response
	} catch (e) {
		if (e.response.status === 401) {
			localStorage.removeItem("mybricks-payload")
			localStorage.removeItem("mybricks-darkMode")
			window.location.href = "/login"
		} else {
			return e.response
		}
	}
}
export default apiCall
