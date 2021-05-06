// Static page to say why we created this Website.
import React from "react"
import { withRouter } from "react-router-dom"

const About: React.FC = () => (
	<div className="container h-screen mx-auto">
		<div className="mt-4">
			<ul className="text-xl space-y-7">
				<li className="list-item">
					This platform was created to allow anyone who may
					not have someone to talk to, to take some of the
					bricks they're carrying and toss them aside into
					the void.
				</li>
				<li className="list-item">
					Sometimes we do not have anyone to talk to or
					don't feel comfortable talking to anyone about our
					issues, and the stress of it brings us down.
					Rather then having the stress weigh us down, let's
					take some weight off our shoulders and throw our
					bricks.
				</li>
				<li className="list-item">
					Every post is 100%{" "}
					<span className="pr-1 font-semibold uppercase">
						annonymous
					</span>
					and you have the option to share your brick
					annonymously to the world, or keep it to yourself.
				</li>
				<li className="list-item">
					We do not share your personal data, you are in a
					safe space!
				</li>
			</ul>
		</div>
	</div>
)

export default withRouter(About)
