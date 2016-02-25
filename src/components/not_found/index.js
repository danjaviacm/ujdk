import React, { Component, PropTypes } from 'react'

export default class NotFound extends Component {

	constructor ( props, context ) {
		
		super( props ) 

		this.state = {}

		context.router
	}

	componentWillMount () {
		this.context.router.push( '/consultar-placa' )
	}

	render() {

		return (
			<div id="step-not-found" className="step step-not-found"></div>
		)
	}
}

NotFound.contextTypes = {
	router: React.PropTypes.object.isRequired
}