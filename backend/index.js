const Hapi = require('hapi');
const Inert = require('inert');
const path = require('path');

const mountRoutes = require('./routes/index.js');

const PORT = 5000;
const server = Hapi.server({
	host: '0.0.0.0',
	port: PORT,
	routes: {
		files: {
			relativeTo: path.resolve(__dirname, '../dist')
		}
	}
});

const boot = async () => {
	await server.register(Inert);
	mountRoutes(server);

	server.route({
		method: 'GET',
		path: '/{path*}',
		handler: {
			directory: {
				path: '.',
			}
		}
	});

	await server.start();
	console.log(`Server listening on port ${PORT}...`);
}

boot();
