import app from './app';
// import custom configuration and utilities
import config from './config';
import logger from './utils/logger';

// listen on the designated port found in the configuration
app.listen(config.server.port, err => {
	if (err) {
		logger.error(err);
		process.exit(1);
	}
	// output the status of the api in the terminal
	logger.info(
		`API is now running on port ${config.server.port} in ${config.env} mode`
	);
});