const mountJobs = require('./jobs.js');

module.exports = function mountRoutes(server) {
	mountJobs(server);
};