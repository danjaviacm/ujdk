import Woopra from 'woopra'
import $ from 'jquery'
import is from 'is_js'

/*
 * UJDK
 * 
 * A simple class for tracking the user behavior
 * and communicate with another domains.
 */
export default class UJDK {

	/* constructor
	 *
	 * @param domain configuratión for woopra
	 * @param ssl allow ssl connections woopra
	 * @param channel non organic traffic sources
	 * @param uj UJ name to be used by the user
	 * @param uid random user identifier
	 */
	constructor ( domain, ssl, channel, uj, uid  ) {

		if ( typeof domain === 'undefined' )
			domain = 'comparamejor.com'

		if ( typeof ssl === 'undefined' )
			ssl = true

		if ( typeof channel === 'undefined' )
			channel = 'SEM'

		if ( typeof uj === 'undefined' )
			uj = 'uj40'

		if ( typeof uid === 'undefined' )
			uid = `user-${ Date.now() }-${ Math.floor( ( Math.random() * 100 ) + 1 ) }`


		this._channel = channel
		this._uj = uj
		this._uid = uid
		this._is_ssl = ssl
		this._domain = domain

		this._allowed_urls = [
        	'http://example.org:8081',
        	'https://seguros.comparamejor.com',
        	'https://unbounce.com',
        	'https://cotiza.comparamejor.com',
        	'https://comparamejor.com',
        	'http://localhost:5000'
        ]

		this._woopra = new Woopra( this._domain )

		if ( this._is_ssl ) {

			this._woopra.config({
			    ssl: true
			})
		}

		if ( typeof this._channel !== 'undefined' && typeof this._uj !== 'undefined' && typeof this._uid !== 'undefined' ) {
			this._woopra.identify( uid, {
			    channel: channel,
			    uj: uj
			}).push()
		}
 
	}


	// Setters & Getters

	set allowed_urls ( url ) {
		super.allowed_urls = this._allowed_urls.push( url )
	}

	get allowed_urls () {
		return this._allowed_urls
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


	/*
	 * track
	 *
	 * allow to track any event in the client side
	 * @param evName name of event to track
	 * @param data info will be to send to woopra
	 */
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

	/*
 	 * openChannelTo
 	 * 
 	 * create the channel of comunication to dest url
 	 * @param destURL url for bridge
 	 * @param idChannel channel name 
	 */
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


	/*
	 * sendMessage
	 * 
	 * send a custom message to the destiny url in the same 
	 * or another domain
	 * @param message message to send
	 * @param domain message receiver domain
	 * @idChannel channel bridge name
	 */
	sendMessage ( message, domain, idChannel ) {

		if ( typeof idChannel === 'undefined' )
			idChannel = 'receiverChannel'
		
		let receiver = document.getElementById( idChannel ).contentWindow

		receiver.postMessage( message, domain )
	}

	/*
	 * receiveMessage
	 * 
	 * receive message from origin window and manage received data
	 * set info package between origin domain and the bridge
	 * @param event event passed to the final or destininy domain
	 */
	receiveMessage ( event ) {

        let origin = event.origin

        let allowedURLs = this._allowed_urls || [
        	'http://example.org:8081',
        	'https://seguros.comparamejor.com',
        	'https://unbounce.com',
        	'https://cotiza.comparamejor.com',
        	'https://comparamejor.com',
        	'http://localhost:5000'
        ]
		
		if ( allowedURLs.indexOf( origin ) == -1 ) {
			throw new Error( 'No tienes permisos de acceso para realizar esta acción.' )
		}

		// Do magic here

		// guardar uid en storage

		console.log( event )
	}


	/*
 	 * log
 	 * 
 	 * log data
 	 * @param data data for log
	 */
	log ( data ) {

		console.log( data )

		debugger
	}

}