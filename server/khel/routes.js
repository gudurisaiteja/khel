const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation1');
const controller = require('./controller');

const router = express.Router();

router.route('/playerInterests')

  /** POST /playerInterests - Get player interest games */
  .post(validate(paramValidation.playerInterests, controller.interests));

module.exports = router;
