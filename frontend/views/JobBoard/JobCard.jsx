import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import st from './index.scss';

export default class JobCard extends Component {
 	static propTypes = {
 		job: PropTypes.object,
 		onCancel: PropTypes.func,
 	};

	handleCancelClick(sequenceId) {
		const { onCancel } = this.props;
		onCancel(sequenceId);
	}

 	render() {
 		const { job } = this.props;
	    return (
			<div className={ st.job }>
				<div className={ st.jobCol }>
					{ job.sequenceId }
				</div>
				<div className={ st.jobCol }>
					{ job.title }
				</div>
				<div className={ st.jobCol }>
					{ new Date(job.createdAt).toLocaleString('en-US') }
				</div>
				<div className={ st.jobCol }>
					{ moment().diff(moment(job.createdAt), 'seconds') } Seconds
				</div>
				<div className={ st.jobCol }>
					{ job.status }
				</div>
				<div className={ st.jobCol}>
					<button
						onClick={ this.handleCancelClick.bind(this, job.sequenceId) }
						className={ st.cancel }>
						Cancel
					</button>
				</div>
			</div>
	    );
 	}
}
