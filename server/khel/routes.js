const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const playerCtrl = require('./controller');

const router = express.Router();
router.route('/')

  /** POST /api/users - Create new player */
  .post(validate(paramValidation.createPlayer), playerCtrl.create);