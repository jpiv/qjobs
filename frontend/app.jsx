import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navigation from 'core/Navigation';
import configStore from 'store/configStore.js';
import st from './index.scss';

const store = configStore();

export default class App extends Component {
	render() {
		const { children } = this.props;
		return (
			<MuiThemeProvider>
				<Provider store={ store }>
					<div className={ st.App }>
						<Navigation />	
						<div className={ st.contentPane }>
							{ children }
						</div>
					</div>
				</Provider>
			</MuiThemeProvider>
		);
	}
};
