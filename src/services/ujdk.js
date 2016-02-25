import Woopra from 'woopra'
import $ from 'jquery'

export default class UJDK {

	constructor ( domain, ssl, channel, uj, uid  ) {

		if ( typeof domain === 'undefined' )
			domain = 'comparamejor.com'

		this._channel = channel
		this._uj = uj
		this._uid = uid
		this._is_ssl = ssl
		this._domain = domain

		this._woopra = new Woopra( this._domain )

		if ( this._is_ssl ) {

			this._woopra.config({
			    ssl: true
			})
		}

		this._woopra.identify( uid, {
		    channel: channel,
		    uj: uj
		}).push()
	}

	set channel ( ch ) {
		super.channel = ch
	}

	get channel () {
		return this._channel
	}

	set uj ( uj ) {
		super.uj = uj
	}

	get uj () {
		return this._uj
	}

	set uid ( uid ) {
		super.uid = uid
	}

	get uid () {
		return this.uid
	}

	get ssl () {
		return this._is_ssl
	}

	track ( evName, data ) {

		try {
			
			if ( typeof data !== 'undefined' ) {

				this._woopra.track( evName, data )
			}

		} catch ( e ) {
			
			// statements
			console.log( e )
		}
	}

	openChannelTo ( destURL, idChannel ) {

		if ( typeof idChannel === 'undefined' )
			idChannel = 'receiverChannel'

		let receiverChannel = document.getElementById( idChannel )

		let nullate = [ null, 'null' ]

		if ( nullate.indexOf( receiverChannel ) != -1 ) {
			
			// Create the tag into the page
			let iframe = document.createElement( 'iframe' )

			// Set iframe attrs
			// iframe.width = 0
			// iframe.height = 0
			iframe.id = idChannel
			// iframe.style.display = 'none'
			iframe.src = destURL

			document.body.appendChild( iframe )
		}

		else {
			throw new Error( 'El elemento requerido ya existia anteriormente, por favor cambia el ID' )
		}
	}


	sendMessage ( domain, message, idChannel ) {

		if ( typeof idChannel === 'undefined' )
			idChannel = 'receiverChannel'
		
		let receiver = document.getElementById( idChannel ).contentWindow

		receiver.postMessage( message, domain )
	}

	receiveMessage ( ev, cb ) {

		window.addEventListener( ev, cb() )

	}


	log ( data ) {

		console.log( data )

		debugger
	}

}