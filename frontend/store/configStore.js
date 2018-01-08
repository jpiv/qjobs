import { createStore, applyMiddleware }  from 'redux';
import thunkMiddleware from 'redux-thunk';

import jobsReducer from './reducers.js';


export default function configStore(initialState) {
	return createStore(
		jobsReducer,
		initialState,
		applyMiddleware(thunkMiddleware),
	);
};
