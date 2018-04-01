'use strict';
const express = require('express');
const morgan = require('morgan');
const nconf = require('nconf');
const pkg = require('./package.json');

// Double underscore string passed to env means that two underscores should
// be used to denote object hierarchy when reading from environment variables.
nconf.argv().env('__');

// Establishes a default value for the conf parameter
nconf.defaults({conf: `${__dirname}/config.json`});

// Tell nconf to load the file defined in the conf path
nconf.file(nconf.get('conf'));

const app = express();

app.use(morgan('dev'));

app.get('/api/version', (req, res) => res.status(200).send(pkg.version));

require('./lib/search.js')(app, nconf.get('es'))

app.listen(nconf.get('port'), () => console.log(`listening localhost:${nconf.get('port')}.`));
