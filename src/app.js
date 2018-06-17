import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

// import custom configuration and utilities
import config from './config';

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

// require the database library (which instantiates a connection to mongodb)
import './utils/db';

export default app;
