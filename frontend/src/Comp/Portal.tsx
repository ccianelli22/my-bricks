import ReactDOM from "react-dom"

interface Props {
	children: JSX.Element
}
const Portal: React.FC<Props> = ({ children }) => {
	const domID = document.getElementById("mainBody")!
	return ReactDOM.createPortal(children, domID!)
}
export default Portal
