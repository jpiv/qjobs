export const REQUEST_JOBS = 'REQUEST_JOBS';
export const RECEIVE_JOBS = 'RECEIVE_JOBS';
export const REQUEST_CREATE_JOB = 'REQUEST_CREATE_JOB';
export const REQUEST_CANCEL_JOB = 'REQUEST_CANCEL_JOB'; 

export function requestJobs() {
	return {
		type: REQUEST_JOBS,
	};
};

export function receiveJobs(jobs) {
	return {
		type: RECEIVE_JOBS,
		payload: {
			jobs,
		},
	};
};

export function requestCreateJob(title) {
	return {
		type: REQUEST_CREATE_JOB,
		payload: {
			title,
		},
	};
};

export function requestCancelJob(sequenceId) {
	return {
		type: REQUEST_CANCEL_JOB,
		payload: {
			sequenceId,
		},
	};
};

export function fetchJobs() {
	return dispatch => {
		dispatch(requestJobs);
		return fetch('http://ip-172-31-62-55.ec2.internal:5000/jobs')
			.then(resp => resp.json())
			.then(jobs => dispatch(receiveJobs(jobs)));
	};
};

export function postJob(title) {
	return dispatch => {
		dispatch(requestCreateJob());
		return fetch('http://ip-172-31-62-55.ec2.internal:5000/jobs', {
			method: 'POST',
			body: JSON.stringify({ title })
		})
			.then(resp => resp.json())
			.then(() => dispatch(fetchJobs()));
	};
};

export function cancelJob(sequenceId) {
	return dispatch => {
		dispatch(requestCancelJob());
		return fetch('http://ip-172-31-62-55.ec2.internal:5000/jobs', {
			method: 'DELETE',
			body: JSON.stringify({ sequenceId })
		})
			.then(resp => resp.json())
			.then(() => dispatch(fetchJobs()));
	};
};
