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

		globalState.callback = ( data ) => {
			this.setState( data )
		}
	}

	clicked () {

		this._ujdk.sendMessage( 'sere mas grande que tu', 'http://localhost:8081' )
	}

	render() {
		return (
			<div>
				Cuando sea grande, voy a ser un hermoso Landing Page!
				<button onClick={ this.clicked.bind( this ) } >click me</button>
			</div>
		);
	}
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
}