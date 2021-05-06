// function to add animation when a modal appears and dissapears

const modalToggle = (id: string) => {
	let modal = document.getElementById(id)!
	modal.classList.toggle("invisible")
	modal.classList.toggle("opacity-0")
	modal.classList.toggle("opacity-100")

	let body = document.getElementById("root")!
	body.classList.toggle("opacity-25")
}
export default modalToggle
