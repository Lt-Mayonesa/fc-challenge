import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

// import custom configuration and utilities
import config from './config';
import logger from './utils/logger';

import objectRoutes from './routes/objects';

// initialize the app
const app = express();

// initialize middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initialize our logger
app.use(morgan('combined'));

app.use(config.server.prefix, objectRoutes);

// listen on the designated port found in the configuration
app.listen(config.server.port, err => {
	if (err) {
		logger.error(err);
		process.exit(1);
	}

	// require the database library (which instantiates a connection to mongodb)
	require('./utils/db');

	// output the status of the api in the terminal
	logger.info(
		`API is now running on port ${config.server.port} in ${config.env} mode`
	);
});

export default app;
