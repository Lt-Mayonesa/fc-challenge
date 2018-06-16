import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

// import custom configuration and utilities
import config from './config';
import logger from './utils/logger';

// initialize the app
const app = express();

// initialize middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initialize our logger
app.use(morgan('combined'));

// listen on the designated port found in the configuration
app.listen(config.server.port, err => {
	if (err) {
		logger.error(err);
		process.exit(1);
	}

	// require the database library (which instantiates a connection to mongodb)
	require('./utils/db');

	// loop through all routes and dynamically require them – passing api
	fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
		require('./routes/' + file)(app);
	});

	// output the status of the api in the terminal
	logger.info(
		`API is now running on port ${config.server.port} in ${config.env} mode`
	);
});

export default app;
