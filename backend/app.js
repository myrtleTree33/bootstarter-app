import logger from './src/config/log.js';  // configure logging first

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import expressLogger from 'morgan';

import indexRouter from './src/routes/index';
import usersRouter from './src/routes/users';
import db from './src/config/db';
import initPassport from './src/plugins/social';

const app = express();

app.use(expressLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Uncomment this to enable social authentication
initPassport(app);

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
