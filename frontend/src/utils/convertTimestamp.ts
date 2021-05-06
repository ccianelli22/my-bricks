// function to convert timestamp to Month Day, Year format

const convertTimestamp = (timestamp: number): string => {
	const months: string[] = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]

	const dateFromTimestamp = new Date(timestamp)
	const day = dateFromTimestamp.getDate()
	const numMonth = dateFromTimestamp.getMonth()
	const month = months[numMonth]
	const year = dateFromTimestamp.getFullYear()

	return `${month} ${day}, ${year}`
}
export default convertTimestamp
