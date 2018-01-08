import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatButton, TextField, Dialog } from 'material-ui';
import classnames from 'classnames';

import { fetchJobs, postJob, cancelJob } from 'store/actions';
import Loader from 'core/Loader';
import JobCard from './JobCard.jsx';
import st from './index.scss';

const mapStateToProps = ({ isFetching, jobs }) => ({
	isFetching,
	jobs,
});

const mapDispatchToProps = dispatch => ({ dispatch });

const MISSING_TITLE_ERROR = 'Job title is required.';

class JobBoard extends Component {
	constructor(props) {
		super(props);
		this.fetchIntervalId = null;
		this.state = {
			createDialogOpen: false,
			pauseDialogOpen: false,
			paused: false,
			jobTitle: '',
			jobError: null,
		};
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchJobs());
		this.fetchIntervalId = setInterval(() => {
			dispatch(fetchJobs());
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.fetchIntervalId);
	}

	componentDidUpdate() {
		const { jobs } = this.props;
		const { paused } = this.state;
		if(paused && jobs.length === 0) {
			this.setState({ paused: false });
		}
	}

	jobDialogOpen() {
		this.setState({ createDialogOpen: true });
	}

	jobDialogClose() {
		this.setState({ createDialogOpen: false });
	}

	pauseDialogOpen() {
		this.setState({ pauseDialogOpen: true });
	}

	pauseDialogClose() {
		this.setState({ pauseDialogOpen: false });
	}

	handleCreateJobClick() {
		const { jobTitle } = this.state;
		const { dispatch } = this.props;
		if(!jobTitle) {
			this.setState({ jobError: MISSING_TITLE_ERROR });
		} else {
			this.setState({
				jobTitle: '',
				errorText: null,
				loading: true,
				createDialogOpen: false,
			})
			dispatch(postJob(jobTitle))
				.then(() => this.setState({ loading: false }));
		}
	}

	handlePauseClick() {
		this.setState({ paused: true, pauseDialogOpen: false });
	}

	handleUnpauseClick() {
		this.setState({ paused: false });
	}

	handleTitleChange(e) {
		const { value } = e.target;
		const errorText = value ? null : MISSING_TITLE_ERROR;
		this.setState({ jobTitle: value, jobError: errorText });
	}

	handleCancelClick(sequenceId) {
		const { dispatch } = this.props;
		dispatch(cancelJob(sequenceId));
	}

	renderJobs() {
		const { jobs } = this.props;

		return jobs.map((job, i) =>
			<JobCard
				key={ i }
				job={ job }
				onCancel={ ::this.handleCancelClick } />
		);
	}

	renderJobDialog() {
		const { createDialogOpen, jobError } = this.state;
		const actions = [
			<FlatButton
				label="Cancel"
				onClick={ ::this.jobDialogClose }
			/>,
			<FlatButton
				label="Create"
				onClick={ ::this.handleCreateJobClick }
				primary
			/>,
		];
		return (
			<Dialog
				open={ createDialogOpen }
				onRequestClose={ ::this.jobDialogClose }
				title="Create Job"
				actions={ actions }
				modal={ false }>
				<TextField
				    autoFocus
					maxLength={ 20 }
					errorText={ jobError }
				    floatingLabelFixed
				    floatingLabelText="Job Title"
				    onChange={ ::this.handleTitleChange }
				/>
			</Dialog>
		);
	}

	renderPauseDialog() {
		const { pauseDialogOpen } = this.state;
		const actions = [
			<FlatButton
				label="No"
				onClick={ ::this.pauseDialogClose }
			/>,
			<FlatButton
				label="Yes"
				onClick={ ::this.handlePauseClick }
				primary
			/>,
		];
		return (
			<Dialog
				open={ pauseDialogOpen }
				onRequestClose={ ::this.pauseDialogClose }
				title="Lock Queue"
				actions={ actions }
				modal={ false }>
				Are you sure you want to lock the Job queue?
			</Dialog>
		);
	}

	renderPauseButton() {
		const { paused } = this.state;
		if(paused) {
			return <button onClick={ ::this.handleUnpauseClick } className={ st.pause }>
				Unpause
			</button>;
		} else {
			return <button onClick={ ::this.pauseDialogOpen } className={ st.pause }>
				Pause
			</button>
		}
	}

	render() {
		const { loading, paused } = this.state;
		return (
			<div className={ st.JobBoard }>
				<Loader loading={ loading } />
				<button
					className={ st.createJob }
					disabled={ paused }
					onClick={ ::this.jobDialogOpen }>
					Create Job
				</button>
				{ this.renderPauseButton() }
				{ this.renderPauseDialog() }
				{ this.renderJobDialog() }
				<div className={ st.jobContainer }>
					<div className={ classnames(st.jobCol, st.header) }>
						Sequence ID
					</div>
					<div className={ classnames(st.jobCol, st.header) }>
						Title
					</div>
					<div className={ classnames(st.jobCol, st.header) }>
						Submission Time
					</div>
					<div className={ classnames(st.jobCol, st.header) }>
						Wait Time
					</div>
					<div className={ classnames(st.jobCol, st.header) }>
						Status
					</div>
					<div className={ classnames(st.jobCol, st.header) }>
						Cancel
					</div>
					{ this.renderJobs() }
				</div>
			</div>
		);
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(JobBoard);
