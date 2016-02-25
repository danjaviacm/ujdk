import React, { Component } from 'react'
import Style from './index.less'

export default class Notification extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {}
  	}

  	render() {
	    return (
	    	<div className={ `notification ${ this.props.classname }` }>
	    		{ this.props.msg }
	    	</div>
	    )
  	}

}