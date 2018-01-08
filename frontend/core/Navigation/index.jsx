import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import qLogo from 'assets/q-logo.png';
import st from './index.scss';

const toolbarStyle = { backgroundColor: '#FCFCFC'}
const titleStyle = { color: '#949494' };
const itemStyle = { color: '#EB943C' };

export default class Navigation extends Component {
  render() {
    return (
    	<Toolbar style={ toolbarStyle } className={ st.Navigation }>
    		<ToolbarGroup>
    			<img className={ st.qLogo }
    				src={ qLogo }
    				width={ 25 }
    				height={ 25 } />
				<ToolbarTitle style={ titleStyle } text="Jobs" />
    		</ToolbarGroup>
    		<ToolbarGroup>
				<ToolbarTitle style={ itemStyle } text="Q Jobs" />
    		</ToolbarGroup>
    	</Toolbar>
    );
  }
}
