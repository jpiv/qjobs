import { combineReducers } from 'redux';

import {
	REQUEST_JOBS,
	RECEIVE_JOBS,
	REQUEST_CREATE_JOB,
	REQUEST_CANCEL_JOB,
} from './actions.js';

function jobs(state={
	isLoading: false,
	jobs: [],
}, action) {
	switch(action.type) {
		case REQUEST_JOBS:
			return Object.assign({}, state, {
				isLoading: true,
			});
		case RECEIVE_JOBS:
			return Object.assign({}, state, {
				isLoading: false,
				jobs: action.payload.jobs,
			});
		case REQUEST_CREATE_JOB:
			return Object.assign({}, state, {
				isLoading: true,
			});
		case REQUEST_CANCEL_JOB:
			return Object.assign({}, state, {
				isLoading: true,
			});
		default:
			return state;
	}
};

export default jobs;
