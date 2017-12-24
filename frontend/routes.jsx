import React, { Component } from 'react';
import { Router, Route, IndexRedirect } from 'react-router';

import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

export default class AppRouter extends Component {
	render() {
		return (
			<Router history={ browserHistory }>
				<Route path="/" component={ App }>
					<IndexRedirect />
				</Route>
			</Router>
		);
	}
};
