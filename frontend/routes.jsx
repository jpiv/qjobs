import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app.jsx';
import JobBoard from 'views/JobBoard';

export default class AppRouter extends Component {
	render() {
		return (
			<Router history={ browserHistory }>
				<Route path="/*" component={ App }>
					<IndexRoute component={ JobBoard } />
				</Route>
			</Router>
		);
	}
};
