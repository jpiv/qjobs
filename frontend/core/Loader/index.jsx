import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactLoader from 'react-loader-spinner';

import st from './index.scss';

export default class index extends Component {
 	static propTypes = {
		loading: PropTypes.bool,
	};


  render() {
  	const { loading } = this.props;
    if(loading)
    	return (
    		<div className={ st.Loader }>
	    		<div className={ st.loaderContainer }>
		    		<ReactLoader
						width={ 30 }
						height={ 30 }
						type="Grid"
						color="#EB943C" />
				</div>
			</div>
		);
    else
    	return null;
  }
}
