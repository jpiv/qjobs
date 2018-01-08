const { getJobs, createJob, cancelJob } = require('../controllers/jobs.js');

const rootPath = '/jobs';
/* Routes layer
	Understands HTTP and REST, simply provides an
	interface around the Controller/API layer that
	is accessible through HTTP.
*/
const routes = [
	{
		method: 'GET',
		path: rootPath,
		handler: getJobs,
		options: {
			cors: true,
		},
	},
	{
		method: 'POST',
		path: rootPath,
		handler: (req, h) => {
			const { title } = JSON.parse(req.payload);
			return createJob(title);
		},
		options: {
			cors: true,
		}
	},
	{
		method: 'DELETE',
		path: rootPath,
		handler: (req, h) => {
			const { sequenceId } = JSON.parse(req.payload);
			return cancelJob(sequenceId);
		},
		options: {
			cors: true,
		}
	},
];

function mountJobs(server) {
	routes.forEach(server.route.bind(server));
};

module.exports = mountJobs;
