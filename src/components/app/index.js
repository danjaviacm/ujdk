import React, { Component } from 'react'
import UJDK from '../../services/ujdk'

// Needed Components


// Parental states
window.globalState = {}

export default class App extends Component {

	constructor ( props, context ) {

		super( props )

		this.state = {}

		this.ujdkData = [
			'comparamejor.com',
			true,
			'Facebook',
			'uj40',
			'mancuso'
		]

		this._ujdk = new UJDK( ...this.ujdkData )

	}

	componentWillMount () {

		this._ujdk.track( 'LPage', {
			step: 'preview'
		})

		this._ujdk.openChannelTo( 'http://localhost:8081' )
		
		this._ujdk.sendMessage( 'http://localhost:8081', 'sere mas grande que tu' )

		globalState.callback = ( data ) => {
			this.setState( data )
		}
	}

	componentDidMount () {

	}

	render() {
		return (
			<div>
				Cuando sea grande, voy a ser un hermoso Landing Page!
			</div>
		);
	}
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
}