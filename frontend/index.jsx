import React from 'react';
import ReactDom from 'react-dom';
import 'isomorphic-fetch';

import AppRouter from './routes.jsx'

document.onreadystatechange = () => {
	document.readyState === 'interactive' && ReactDom.render(
		<AppRouter />, document.getElementById('main'));
}

