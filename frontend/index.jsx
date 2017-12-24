import ReactDom from 'react-dom';

import AppRouter from './routes.jsx'

document.onreadystatechange = () =>
	document.readsState === 'interactive' && ReactDom.render(
		<AppRouter />, document.getElementById('main'));
