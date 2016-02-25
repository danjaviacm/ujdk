import React, { PropTypes, Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { createHashHistory } from 'history'
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory, useRouterHistory, Redirect } from 'react-router'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

// Include Components
import NotFound from './not_found'
import App from './app'

// Root component
export default class Root extends Component {

	constructor ( props, context ) {

		super( props )

		this.state = {}
	}

	render() {
		return (
			<Router history={appHistory}>
				{/*<Redirect from="/" to="/consultar-placa" />*/}
				<Route path='/' component={ App }>
					{/*<IndexRoute component={ QueryRegistration } />*/}
					<Route path='*' component={ NotFound } />
				</Route>
			</Router>
		);
	}
}