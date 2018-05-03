import logger from './src/config/log.js';  // configure logging first

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import expressLogger from 'morgan';

import indexRouter from './src/routes/index';
import usersRouter from './src/routes/users';
import db from './src/config/db';
import initPassport from './src/plugins/social';
import enableCors from './src/plugins/enableCors';
import cors from 'cors';

const app = express();

// enable cors 
// enableCors(app);
app.use(cors());

app.use(expressLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Uncomment this to enable social authentication
initPassport(app);

// place route middleware here -------------------------------
app.use('/', indexRouter);
app.use('/users', usersRouter);
// -----------------------------------------------------------

app.use((req, res, next) => res.json(404, {description: 'API not found.'}));

export default app;
