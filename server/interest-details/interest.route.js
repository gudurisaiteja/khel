const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const interestCtrl = require('./interest.controller');

const expressJwt = require('express-jwt');

const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap



router.route('/:PlayerID')

/*POST api/interest - to insert the player into interest table */
//.post([expressJwt({secret: config.jwtSecret})],interestCtrl.insert);
.post(interestCtrl.insert);
