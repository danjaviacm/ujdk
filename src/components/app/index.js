import React, { Component } from 'react'
import UJDK from '../../services/ujdk'

// Needed Components


// Parental states
window.globalState = {}

export default class App extends Component {

	constructor ( props, context ) {

		super( props )

		this.state = {}

		this._ujdk = UJDK

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

		let originData = {
			uj: this._ujdk._uj,
			channel: this._ujdk._channel,
			uid: this._ujdk._uid
		}

		this._ujdk.sendMessage( originData, 'http://localhost:8081' )
		window.location.href = 'http://localhost:8081'
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
