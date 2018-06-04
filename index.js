var pg = require('pg');
const util = require('util');

// config should be imported before importing any other file
const config = require('./config/config');
const pgconn = require('./config/pgconn');
const app = require('./config/express');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
 
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

module.exports = app;
