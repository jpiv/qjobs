const jobsData = require('../data/jobs.js');

/* Controller/API layer
	Contains busniess logic that may span multiple data
	areas and can interact with other APIs

	Should be consumable by other NodeJS APIs or wrapped
	in a RESTful interface to be consumed by other application
	or micro-services
*/
const jobsController = {
	getJobs() {
		return jobsData.jobsQueue;
	},

	createJob(title) {
		return jobsData.createJob(title);
	},

	cancelJob(sequenceId) {
		return jobsData.cancelJob(sequenceId);
	}
};

module.exports = jobsController;
