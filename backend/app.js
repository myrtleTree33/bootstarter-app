import logger from './src/config/log.js';  // configure logging first

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import expressLogger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import db from './src/config/db';

const app = express();

app.use(expressLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
