import React, { Component } from "react"

export class container extends Component {
	render() {
		return (
			<div
				class='p-5 mx-auto mt-5'
				style={{ backgroundColor: "rgba(63, 191, 191, .8)" }}
			>
				<h1 class='alert-heading text-center '>{this.props.children}</h1>
			</div>
		)
	}
}

export default container
