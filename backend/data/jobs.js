const leftPad = require('left-pad');

const jobStatuses = {
	QUEUED: 'Queued',
	PROCESSING: 'Processing',
	COMPLETE: 'Complete',
};

/* Data layer
	Provides an interface for Reading and Modifying
	Job data.

	Should not have business logic, serves mostly as a
	proxy to the data store(In memory in this case)
	and maintains a schema.
*/
const jobsData = {
	jobsQueue: [],
	_processing: false,
	_timeoutId: null,

	createJob(title) {
		const job = {
			sequenceId: leftPad(this.jobsQueue.length + 1, 4, '0'),
			title: title,
			createdAt: new Date(),
			status: jobStatuses.QUEUED,
		};
		this.jobsQueue.push(job);
		this.processJobs();

		return job;
	},

	cancelJob(sequenceId) {
		let jobIndex;
		this.jobsQueue.find((job, i) => {
			jobIndex = i;
			return sequenceId === job.sequenceId;
		});
		const removedJob = this.jobsQueue.splice(jobIndex, 1)[0];
		// If the canceled job is currently being processed
			// cancel the processing and start it on the next job
		if(removedJob.status === jobStatuses.PROCESSING) {
			clearTimeout(this._timeoutId);
			this._processing = false;
			this.processJobs();
		}
		return removedJob;
	},

	processJobs() {
		if(this.jobsQueue.length && !this._processing) {
			const job = this.jobsQueue[0];
			const processTime = (Math.random() * (15000 - 500)) + 500;
			job.status = jobStatuses.PROCESSING;
			this._processing = true;
			console.log(`Processing Job #${job.sequenceId}`, processTime, 'ms');
			this._timeoutId = setTimeout(() => {
				this.jobsQueue.shift();
				this._processing = false;
				this.processJobs();
			} , processTime);
		} 			
	},
};

module.exports = jobsData;
