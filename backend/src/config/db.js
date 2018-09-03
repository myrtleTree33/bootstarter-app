// Configures Mongo DB using Mongoose driver and ES6 promises

const mongoose = require('mongoose');
import logger from 'winston';
import config from '../../config.js';

let db = (() => {
  mongoose.Promise = Promise; // ES6 promises
  mongoose
    .connect(config.db.mongoURI)
    .then(() => logger.info('Connected to database!'))
    .catch(e => logger.error(`Unable to connect to database: ${e}`));
})();

export default db;
