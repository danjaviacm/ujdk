import React, { Component } from 'react'

// Needed Components

// Parental states
window.globalState = {}

export default class App extends Component {

	constructor ( props, context ) {

		super( props )

		this.state = {}

	}

	componentWillMount () {

		globalState.callback = ( data ) => {
			this.setState( data )
		}
	}

	componentDidMount () {

	}

	render() {
		return (
			<div>
				Hello World!!
			</div>
		);
	}
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
}