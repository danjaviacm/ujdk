import store from 'store2'

class Uj4Helper {

	update ( ...args ) {

		if ( args.length > 2 ) {

			try {

				if ( store.has( args[ 0 ] ) ) {

					let data = JSON.parse( store.get( args[ 0 ] ) )

					data[ args[ 1 ] ] = args[ 2 ]

					store.set( args[ 0 ], JSON.stringify( data ) )

					return true
				}

				else 
					store.set( args[ 0 ], JSON.stringify( args[ 2 ] ) ) 


			} catch( e ) {

				// statements
				console.log( `You has the following error:  ${ e }` )
			}
		}

		else {

			if ( store.has( args[ 0 ] ) ) {

				let data = JSON.parse( store.get( args[ 0 ] ) )

				let newState = Object.assign( data, args[ 1 ] )

				store.set( args[ 0 ], JSON.stringify( newState ) )
			}

		}
	}

	log ( entity ) {
		let logData = JSON.parse( store.get( entity ) )
		debugger
	}

	has ( entity ) {
		return store.has( args[ 0 ] ) ? true : false
	}

	get ( entity ) {
		return JSON.parse( store.get( entity ) )
	}
}

export default new Uj4Helper()