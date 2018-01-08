const expect = require('chai').expect;

const jobsController = require('../../controllers/jobs.js');

describe('Jobs controller tests', function() {
	describe('createJob', function() {
		let testJob;
		before(() => {
			testJob = jobsController.createJob('test_job');
		});

		it('Should create a valid Job', () => {
			expect(testJob).to.exist;
			expect(testJob).to.be.an('object');
		});

		it('Should have a correct title', () => {
			expect(testJob).to.have.property('title');
			expect(testJob.title).to.equal('test_job');
		});

		it('Should have correct Job properties', () => {
			expect(testJob).to.have.property('title');
			expect(testJob).to.have.property('status');
			expect(testJob).to.have.property('createdAt');
			expect(testJob).to.have.property('sequenceId');
		});
	});

	describe('getJobs', function() {
		let testJob;
		before(() => {
			testJob = jobsController.createJob('test_job');
		});

		it('Should retrieve jobs', () => {
			const fetchedJobs = jobsController.getJobs();
			expect(fetchedJobs).to.be.an('array');
			expect(fetchedJobs.length).to.be.above(0);
		});

		it('Should contain testJob', () => {
			const fetchedJobs = jobsController.getJobs();
			expect(fetchedJobs.indexOf(testJob)).to.not.equal(-1);
		})
	});

	describe('cancelJob', function() {
		let testJob;
		before(() => {
			testJob = jobsController.createJob('test_job');
		});

		it('Should remove testJob from the job queue', () => {
			jobsController.cancelJob(testJob.sequenceId);
			const fetchedJobs = jobsController.getJobs();
			expect(fetchedJobs.indexOf(testJob)).to.equal(-1);
		});

	});
});
